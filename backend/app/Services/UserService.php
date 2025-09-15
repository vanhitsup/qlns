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
use App\Services\FileUploadService;
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
    protected FileUploadService $fileUploadService;

    public function __construct(
        StaffResumeService $staffResumeService,
        StaffPositionSalaryService $staffPositionSalaryService,
        StaffEducationService $staffEducationService,
        FileUploadService $fileUploadService
    ) {
        $this->staffResumeService = $staffResumeService;
        $this->staffPositionSalaryService = $staffPositionSalaryService;
        $this->staffEducationService = $staffEducationService;
        $this->fileUploadService = $fileUploadService;
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

            if (!empty($userData['profileImage']) || !empty($userData['nationalIdImage'])) {
                $this->processFileUploads($userData, $userData['username']);
            }

            $createUser = Users::create([
                'fullName' => $userData['fullName'] ?? null,
                'username' => $userData['username'] ?? null,
                'password' => $hash,
                'roleId' => $userData['roleId'] ?? null,
                'email' => $userData['email'] ?? null,
                'phone' => $userData['phone'] ?? null,
                'nationalId' => $userData['nationalId'] ?? null,
                'nationalIdImage' => $userData['nationalIdImage'] ?? null,
                'departmentId' => $userData['departmentId'] ?? null,
                'status' => $userData['status'] ?? 'active',
                'note' => $userData['note'] ?? null,
                'profileImage' => $userData['profileImage'] ?? null,
            ]);

            // Xử lý file upload cho staffResumes
            if (!empty($userData['staffResumes'])) {
                $this->processFileUploads($userData['staffResumes'], $createUser->username);
                $this->staffResumeService->createStaffResume($createUser->id, $userData['staffResumes']);
            }

            // Tạo thông tin chức danh và lương nếu có
            if (!empty($userData['staffPositionSalaries'])) {
                $this->staffPositionSalaryService->createStaffPositionSalary($createUser->id, $userData['staffPositionSalaries']);
            }

            // Xử lý file upload cho staffEducations
            if (!empty($userData['staffEducations'])) {
                $this->processFileUploads($userData['staffEducations'], $createUser->username);
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

    /**
     * Xử lý upload file cho các trường file
     */
    private function processFileUploads(array &$data, string $username = null): void
    {
        $fileFields = [
            'healthCertificate' => 'health-certificates',
            'resume' => 'resumes',
            'attachedFile' => 'education-files',
            'securityDefenseCertificate' => 'security-defense-certificates',
            'itCertificate' => 'it-certificates',
            'languageCertificate' => 'language-certificates',
            'profileImage' => 'profile-image',
            'nationalIdImage' => 'national-id',
        ];
        foreach ($fileFields as $field => $directory) {
            if (!isset($data[$field])) {
                continue;
            }

            // Single file: keep behavior for profileImage; also accept single for others
            if ($data[$field] instanceof \Illuminate\Http\UploadedFile) {
                $filePath = $this->fileUploadService->processFileUpload($data[$field], $directory, $username);
                if ($filePath) {
                    $data[$field] = $field === 'profileImage' ? $filePath : json_encode([$filePath]);
                }
                continue;
            }

            // Multiple files: array of UploadedFile
            if (is_array($data[$field])) {
                $paths = [];
                foreach ($data[$field] as $maybeFile) {
                    if ($maybeFile instanceof \Illuminate\Http\UploadedFile) {
                        $p = $this->fileUploadService->processFileUpload($maybeFile, $directory, $username);
                        if ($p) {
                            $paths[] = $p;
                        }
                    }
                }
                if (!empty($paths)) {
                    // profileImage remains single
                    $data[$field] = $field === 'profileImage' ? $paths[0] : json_encode($paths);
                } else {
                    unset($data[$field]);
                }
            }
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
