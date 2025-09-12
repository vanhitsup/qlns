<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Services\UserInfoService;
use App\Services\UserService;
use App\Traits\UserAuthTrait;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\Users;
use Illuminate\Http\{Request, JsonResponse};
use Illuminate\Support\Facades\{Hash, Cookie, DB};

class UsersController extends Controller
{
    use UserAuthTrait;

    protected UserService $userService;
    protected UserInfoService $userInfoService;

    public function __construct(UserService $userService, UserInfoService $userInfoService)
    {
        $this->userService = $userService;
        $this->userInfoService = $userInfoService;
    }

    public function login(Request $request): JsonResponse
    {
        try {
            return $this->userService->UserAuthenticate($request);
        } catch (Exception $error) {
            return $this->badRequest($error->getMessage());
        }
    }

    public function logout(Request $request): JsonResponse
    {
        try {
            $cookie = Cookie::forget('refreshToken');
            return $this->success("Logout successfully")->withCookie($cookie);
        } catch (Exception $error) {
            return $this->badRequest($error->getMessage());
        }
    }

    // create user controller method
    public function register(Request $request): JsonResponse
    {
        try {
            // Convert FormData to array for validation
            $data = $request->all();
            logger($data);

            $request->validate([
                'username' => 'required|string|unique:users,username',
                'email' => 'nullable|email|unique:users,email',
                'password' => 'required|string',
                // Thông tin chung
                'fullName' => 'required|string',
                'phone' => 'nullable|string',
                'nationalId' => 'nullable|string',
                'nationalIdImage' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,pdf',
                'roleId' => 'nullable|integer|exists:role,id',
                'departmentId' => 'nullable|integer|exists:department,id',
                'status' => 'nullable|string|in:active,inactive',
                'note' => 'nullable|string',
                'profileImage' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg',

                // Validation cho staffResumes
                'staffResumes' => 'nullable',
                'staffResumes.fullNameBirth' => 'nullable|string',
                'staffResumes.gender' => 'nullable|in:Nam,Nữ',
                'staffResumes.otherNames' => 'nullable|string',
                'staffResumes.birthDate' => 'nullable|date',
                'staffResumes.birthProvince' => 'nullable|string',
                'staffResumes.birthDistrict' => 'nullable|string',
                'staffResumes.birthWard' => 'nullable|string',
                'staffResumes.hometownProvince' => 'nullable|string',
                'staffResumes.hometownDistrict' => 'nullable|string',
                'staffResumes.hometownWard' => 'nullable|string',
                'staffResumes.permanentAddress' => 'nullable|string',
                'staffResumes.nationality' => 'nullable|string',
                'staffResumes.ethnicity' => 'nullable|string',
                'staffResumes.religion' => 'nullable|string',
                'staffResumes.personalId' => 'nullable|string',
                'staffResumes.issueDate' => 'nullable|date',
                'staffResumes.issuePlace' => 'nullable|string',
                'staffResumes.bankAccountNumber' => 'nullable|string',
                'staffResumes.bankName' => 'nullable|string',
                'staffResumes.healthCertificate' => 'nullable|file|mimes:jpeg,jpg,png,pdf,doc,docx|max:5120',
                'staffResumes.resume' => 'nullable|file|mimes:jpeg,jpg,png,pdf,doc,docx|max:5120',
                'staffResumes.height' => 'nullable|integer|min:0',
                'staffResumes.weight' => 'nullable|integer|min:0',
                'staffResumes.stateTitle' => 'nullable|string',
                'staffResumes.familyBackground' => 'nullable|string',
                'staffResumes.previousOccupation' => 'nullable|string',
                'staffResumes.joinPartyDate' => 'nullable|date',
                'staffResumes.partyCardNumber' => 'nullable|string',
                'staffResumes.joinPartyDateOficial' => 'nullable|date',
                'staffResumes.partyPosition' => 'nullable|string',
                'staffResumes.leavePartyDate' => 'nullable|date',
                'staffResumes.birthDateParty' => 'nullable|date',
                'staffResumes.partyCell' => 'nullable|string',
                'staffResumes.joinPartyDate2nd' => 'nullable|date',
                'staffResumes.joinOrganizationDate' => 'nullable|date',
                'staffResumes.joinArmyDate' => 'nullable|date',
                'staffResumes.leaveArmyDate' => 'nullable|date',
                'staffResumes.highestRank' => 'nullable|string',
                'staffResumes.policyObject' => 'nullable|string',
                'staffResumes.educationLevelGeneral' => 'nullable|string',
                'staffResumes.workHistory' => 'nullable|string',
                'staffResumes.workUnit' => 'nullable|string',
                'staffResumes.positionTitle' => 'nullable|string',
                'staffResumes.firstRecruitmentDate' => 'nullable|date',
                'staffResumes.currentAgencyJoinDate' => 'nullable|date',
                'staffResumes.arrestHistory' => 'nullable|string',
                'staffResumes.organizationRelations' => 'nullable|string',
                'staffResumes.familyRelations' => 'nullable|string',
                'staffResumes.familyEconomy' => 'nullable|string',
                'staffResumes.leaveDate' => 'nullable|date',
                'staffResumes.retirementDate' => 'nullable|date',
                'staffResumes.staffCode' => 'nullable|string',
                'staffResumes.bloodGroup' => 'nullable|string|in:A+,A-,B+,B-,O+,O-,AB+,AB-',

                // Validation cho staffPositionSalaries
                'staffPositionSalaries' => 'nullable',
                'staffPositionSalaries.positionTitle' => 'nullable|string',
                'staffPositionSalaries.positionCode' => 'nullable|string',
                'staffPositionSalaries.appointmentStartDate' => 'nullable|date',
                'staffPositionSalaries.appointmentEndDate' => 'nullable|date',
                'staffPositionSalaries.reappointmentDate' => 'nullable|date',
                'staffPositionSalaries.positionAllocation' => 'nullable|string',
                'staffPositionSalaries.concurrentPosition' => 'nullable|string',
                'staffPositionSalaries.currentPartyPosition' => 'nullable|string',
                'staffPositionSalaries.alternatePartyPosition' => 'nullable|string',
                'staffPositionSalaries.workPosition' => 'nullable|string',
                'staffPositionSalaries.mainAssignedJob' => 'nullable|string',
                'staffPositionSalaries.specializedField' => 'nullable|string',
                'staffPositionSalaries.longestJob' => 'nullable|string',
                'staffPositionSalaries.positionSalary' => 'nullable|string',
                'staffPositionSalaries.salaryLevel' => 'nullable|string',
                'staffPositionSalaries.salaryCoefficient' => 'nullable|string',
                'staffPositionSalaries.salaryStartDate' => 'nullable|date',
                'staffPositionSalaries.salaryPercentage' => 'nullable|string',
                'staffPositionSalaries.seniorityAllowance' => 'nullable|string',
                'staffPositionSalaries.pctnvkDate' => 'nullable|date',
                'staffPositionSalaries.positionAllowance' => 'nullable|string',
                'staffPositionSalaries.additionalAllowance' => 'nullable|string',
                'staffPositionSalaries.otherAllowance' => 'nullable|string',
                'staffPositionSalaries.jobPosition' => 'nullable|string',
                'staffPositionSalaries.jobCode' => 'nullable|string',
                'staffPositionSalaries.salaryAmount' => 'nullable|string',
                'staffPositionSalaries.salaryComment' => 'nullable|string',
                'staffPositionSalaries.additionalIncome' => 'nullable|string',

                // Validation cho staffEducations
                'staffEducations' => 'nullable',
                'staffEducations.academicTitle' => 'nullable|string',
                'staffEducations.degree' => 'nullable|string',
                'staffEducations.issuingOrganization' => 'nullable|string',
                'staffEducations.educationLevel' => 'nullable|string',
                'staffEducations.attachedFile' => 'nullable|file|mimes:jpeg,jpg,png,pdf,doc,docx,xls,xlsx|max:5120',
                'staffEducations.politicalTheory' => 'nullable|string',
                'staffEducations.specialized' => 'nullable|string',
                'staffEducations.trainingInstitution' => 'nullable|string',
                'staffEducations.trainingSpecialization' => 'nullable|string',
                'staffEducations.trainingForm' => 'nullable|string',
                'staffEducations.educationDegree' => 'nullable|string',
                'staffEducations.educationStartDate' => 'nullable|date',
                'staffEducations.educationEndDate' => 'nullable|date',
                'staffEducations.trainingContent' => 'nullable|string',
                'staffEducations.managementTrainingInstitution' => 'nullable|string',
                'staffEducations.managementTrainingStartDate' => 'nullable|date',
                'staffEducations.managementTrainingEndDate' => 'nullable|date',
                'staffEducations.securityDefenseTraining' => 'nullable|string',
                'staffEducations.securityDefenseInstitution' => 'nullable|string',
                'staffEducations.securityDefenseCertificate' => 'nullable|file|mimes:jpeg,jpg,png,pdf,doc,docx|max:5120',
                'staffEducations.securityDefenseStartDate' => 'nullable|date',
                'staffEducations.securityDefenseEndDate' => 'nullable|date',
                'staffEducations.itSkills' => 'nullable|string',
                'staffEducations.itTrainingInstitution' => 'nullable|string',
                'staffEducations.itCertificate' => 'nullable|file|mimes:jpeg,jpg,png,pdf,doc,docx|max:5120',
                'staffEducations.itTrainingStartDate' => 'nullable|date',
                'staffEducations.itTrainingEndDate' => 'nullable|date',
                'staffEducations.foreignLanguage' => 'nullable|string',
                'staffEducations.languageTrainingInstitution' => 'nullable|string',
                'staffEducations.languageCertificate' => 'nullable|file|mimes:jpeg,jpg,png,pdf,doc,docx|max:5120',
                'staffEducations.languageTrainingStartDate' => 'nullable|date',
                'staffEducations.languageTrainingEndDate' => 'nullable|date',
            ]);

            return $this->userService->createUser($data);
        } catch (Exception $error) {
            return $this->badRequest($error->getMessage());
        }
    }

    // get all the user controller method
    public function getAllUser(Request $request): JsonResponse
    {
        return $this->userInfoService->getAllUsers($request);
    }

    // get a single user controller method
    public function getSingleUser(Request $request): JsonResponse
    {
        try {

            $authorizationResult = $this->authorizeUser($request);
            if ($authorizationResult !== null) {
                return $authorizationResult;
            }

            $singleUser = Users::where('id', $request['id'])
                ->with('role', 'department', 'staffResume', 'staffPositionSalary', 'staffEducation')
                ->first();
            if (!$singleUser) {
                return $this->notFound('User not found!');
            }

            $userWithoutPassword = $singleUser->toArray();
            unset($userWithoutPassword['password']);

            return $this->response($userWithoutPassword);
        } catch (Exception $error) {
            return $this->badRequest($error->getMessage());
        }
    }

    public function updateSingleUser(Request $request, $id): JsonResponse
    {
        DB::beginTransaction();
        try {
            if ($request->input('password')) {
                $hash = Hash::make($request->input('password'));
                $request->merge([
                    'password' => $hash,
                ]);
            }

            $user = Users::findOrFail((int)$id);

            if (!$user) {
                return $this->badRequest('User not found!');
            }

            //if role is super admin you can not change your own roleId, if not super admin you can not change roleId to super admin
            if ($request->input('roleId') === 1) {
                return $this->badRequest('You can not change the role to super admin');
            }

            if ($user->roleId === 1 && $request->input('roleId')) {
                return $this->badRequest('You can not change super admin role');
            }

            $user->update($request->all());
            $user->save();

            $userWithoutPassword = $user->toArray();
            unset($userWithoutPassword['password']);
            DB::commit();
            return $this->response($userWithoutPassword);
        } catch (ModelNotFoundException $e) {
            return $this->notFound('User not found!');
        } catch (Exception $error) {
            DB::rollback();
            return $this->badRequest($error->getMessage());
        }
    }

    public function deleteUser(Request $request, $id): JsonResponse
    {
        try {
            //update the status
            $user = Users::findOrFail($id);
            if (!$user) {
                return $this->notFound('User not found!');
            }
            $user->status = $request->input('status');
            $user->save();
            return $this->success('User status updated successfully');
        } catch (ModelNotFoundException $e) {
            return $this->notFound('User not found!');
        } catch (Exception $error) {
            return $this->badRequest($error->getMessage());
        }
    }
}
