<?php

namespace App\Services;

use App\Models\DesignationHistory;
use App\Models\Education;
use App\Models\RolePermission;
use App\Models\SalaryHistory;
use App\Models\Store;
use App\Models\Subscription;
use App\Services\StaffResumeService;
use App\Services\StaffPositionSalaryService;
use App\Services\StaffEducationService;
use Carbon\Carbon;
use Exception;
use App\Models\Users;
use Firebase\JWT\JWT;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\{DB, Hash, Cookie, Http};
use App\Traits\ErrorTrait;

class UserService
{
    use ErrorTrait;

    protected StaffResumeService $staffResumeService;
    protected StaffPositionSalaryService $staffPositionSalaryService;
    protected StaffEducationService $staffEducationService;

    public function __construct(
        StaffResumeService $staffResumeService,
        StaffPositionSalaryService $staffPositionSalaryService,
        StaffEducationService $staffEducationService
    ) {
        $this->staffResumeService = $staffResumeService;
        $this->staffPositionSalaryService = $staffPositionSalaryService;
        $this->staffEducationService = $staffEducationService;
    }

    public function UserAuthenticate($request): JsonResponse
    {
        try {

            $sub = $this->isSubscribed();
            if ($sub === false) {
                return $this->unauthorized("Your subscription has expired");
            }

            $user = Users::where('username', $request->input('username'))->with('role:id,name')->first();

            if (!$user) {
                return $this->unauthorized("Username or password is incorrect");
            }

            $pass = Hash::check($request->input('password'), $user->password);

            if (!$pass) {
                return $this->unauthorized("Username or password is incorrect");
            }

            $token = $this->generateToken($user);

            $refreshToken = $this->generateRefreshToken($user);

            $cookie = $this->createRefreshTokenCookie($refreshToken);

            $userWithoutPassword = $this->prepareUserData($user, $token);

            return $this->response($userWithoutPassword)->withCookie($cookie);
        } catch (Exception $error) {
            return $this->badRequest($error->getMessage());
        }
    }

    //TODO: need to update subscription validation
    private function isSubscribed(): bool
    {
        return true;
    }

    private function generateToken($user): string
    {
        $token = [
            "sub" => $user->id,
            "roleId" => $user['role']['id'],
            "role" => $user['role']['name'],
            //            2 min token
            //            "exp" => time() + (60 * 2)
            "exp" => time() + (60 * 60 * 6),
        ];

        return JWT::encode($token, env('JWT_SECRET'), 'HS256');
    }

    private function generateRefreshToken($user): string
    {
        $refreshToken = [
            "sub" => $user->id,
            "role" => $user['role']['name'],
            "exp" => time() + 86400 * 30
        ];

        return JWT::encode($refreshToken, env('REFRESH_SECRET'), 'HS384');
    }

    private function createRefreshTokenCookie($refreshToken): \Symfony\Component\HttpFoundation\Cookie
    {
        return Cookie::make('refreshToken', $refreshToken, 60 * 24 * 30)
            ->withPath('/')
            ->withHttpOnly()
            ->withSameSite('None')
            ->withSecure();
    }

    private function prepareUserData($user, $token): array
    {
        $userWithoutPassword = $user->toArray();
        $userWithoutPassword['role'] = $user['role']['name'];
        $userWithoutPassword['token'] = $token;
        unset($userWithoutPassword['password']);

        return $userWithoutPassword;
    }

    //register

    public function createUser(array $userData): JsonResponse
    {
        DB::beginTransaction();
        try {
            $hash = Hash::make($userData['password']);

            if (isset($userData['roleId']) && $userData['roleId'] === 1) {
                return $this->forbidden("You can not create super admin");
            }

            $createUser = Users::create([
                'firstName' => $userData['firstName'] ?? null,
                'lastName' => $userData['lastName'] ?? null,
                'username' => $userData['username'] ?? null,
                'password' => $hash,
                'roleId' => $userData['roleId'] ?? null,
                'email' => $userData['email'] ?? null,
                'phone' => $userData['phone'] ?? null,
                'nationalId' => $userData['nationalId'] ?? null,
                'departmentId' => $userData['departmentId'] ?? null,
                'status' => $userData['status'] ?? 'active',
            ]);

            // Tạo thông tin sơ yếu lý lịch nếu có
            if (isset($userData['staffResumes']) && !empty($userData['staffResumes'])) {
                $this->staffResumeService->createStaffResume($createUser->id, $userData['staffResumes']);
            }

            // Tạo thông tin chức danh và lương nếu có
            if (isset($userData['staffPositionSalaries']) && !empty($userData['staffPositionSalaries'])) {
                $this->staffPositionSalaryService->createStaffPositionSalary($createUser->id, $userData['staffPositionSalaries']);
            }

            // Tạo thông tin giáo dục nếu có
            if (isset($userData['staffEducations']) && !empty($userData['staffEducations'])) {
                $this->staffEducationService->createStaffEducation($createUser->id, $userData['staffEducations']);
            }

            unset($createUser['password']);
            DB::commit();
            return $this->response($createUser->toArray());
        } catch (Exception $error) {
            DB::rollback();
            return $this->badRequest($error);
        }
    }

    private function createStore($userId, $userData): JsonResponse
    {
        try {

            DB::commit();
            return $this->success('Store Assigned to user successfully');
        } catch (Exception $error) {
            DB::rollback();
            return $this->badRequest($error);
        }
    }

    private function updateRolePermission($userData): JsonResponse
    {
        DB::beginTransaction();
        try {
            //update role permission
            RolePermission::create([
                'roleId' => $userData['roleId'],
                'permissionId' => 28
            ]);

            DB::commit();
            return $this->success('Role Permission updated successfully');
        } catch (Exception $error) {
            DB::rollback();
            return $this->badRequest($error);
        }
    }
}
