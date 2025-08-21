<?php

namespace App\Services;

use App\Models\StaffEducation;
use App\Models\Users;
use App\Traits\ErrorTrait;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class StaffEducationService
{
    use ErrorTrait;

    /**
     * Tạo thông tin giáo dục mới
     */
    public function createStaffEducation(int $userId, array $educationData): JsonResponse
    {
        DB::beginTransaction();
        try {
            $educationData['userId'] = $userId;
            
            $staffEducation = StaffEducation::create($educationData);
            
            DB::commit();
            return $this->response($staffEducation);
        } catch (Exception $error) {
            DB::rollback();
            return $this->badRequest($error->getMessage());
        }
    }

    /**
     * Cập nhật thông tin giáo dục
     */
    public function updateStaffEducation(int $userId, array $educationData): JsonResponse
    {
        DB::beginTransaction();
        try {
            $staffEducation = StaffEducation::where('userId', $userId)->first();
            
            if (!$staffEducation) {
                return $this->notFound('Staff education not found');
            }
            
            $staffEducation->update($educationData);
            
            DB::commit();
            return $this->response($staffEducation);
        } catch (Exception $error) {
            DB::rollback();
            return $this->badRequest($error->getMessage());
        }
    }

    /**
     * Lấy thông tin giáo dục theo userId
     */
    public function getStaffEducationByUserId(int $userId): JsonResponse
    {
        try {
            $staffEducation = StaffEducation::where('userId', $userId)->first();
            
            if (!$staffEducation) {
                return $this->notFound('Staff education not found');
            }
            
            return $this->response($staffEducation);
        } catch (Exception $error) {
            return $this->badRequest($error->getMessage());
        }
    }

    /**
     * Xóa thông tin giáo dục
     */
    public function deleteStaffEducation(int $userId): JsonResponse
    {
        DB::beginTransaction();
        try {
            $staffEducation = StaffEducation::where('userId', $userId)->first();
            
            if (!$staffEducation) {
                return $this->notFound('Staff education not found');
            }
            
            $staffEducation->delete();
            
            DB::commit();
            return $this->success('Staff education deleted successfully');
        } catch (Exception $error) {
            DB::rollback();
            return $this->badRequest($error->getMessage());
        }
    }

    /**
     * Lấy tất cả thông tin giáo dục
     */
    public function getAllStaffEducations(): JsonResponse
    {
        try {
            $staffEducations = StaffEducation::with('user:id,firstName,lastName,username')->get();
            
            return $this->response($staffEducations);
        } catch (Exception $error) {
            return $this->badRequest($error->getMessage());
        }
    }

    /**
     * Tìm kiếm thông tin giáo dục
     */
    public function searchStaffEducations(array $filters): JsonResponse
    {
        try {
            $query = StaffEducation::with('user:id,firstName,lastName,username');
            
            // Áp dụng các filter
            if (isset($filters['degree'])) {
                $query->where('degree', 'like', '%' . $filters['degree'] . '%');
            }
            
            if (isset($filters['educationLevel'])) {
                $query->where('educationLevel', 'like', '%' . $filters['educationLevel'] . '%');
            }
            
            if (isset($filters['trainingInstitution'])) {
                $query->where('trainingInstitution', 'like', '%' . $filters['trainingInstitution'] . '%');
            }
            
            if (isset($filters['specialized'])) {
                $query->where('specialized', 'like', '%' . $filters['specialized'] . '%');
            }
            
            if (isset($filters['foreignLanguage'])) {
                $query->where('foreignLanguage', 'like', '%' . $filters['foreignLanguage'] . '%');
            }
            
            $staffEducations = $query->get();
            
            return $this->response($staffEducations);
        } catch (Exception $error) {
            return $this->badRequest($error->getMessage());
        }
    }

    /**
     * Lấy thống kê trình độ giáo dục theo phòng ban
     */
    public function getEducationStatisticsByDepartment(): JsonResponse
    {
        try {
            $statistics = StaffEducation::join('users', 'staff_educations.userId', '=', 'users.id')
                ->join('departments', 'users.departmentId', '=', 'departments.id')
                ->select(
                    'departments.name as departmentName',
                    DB::raw('COUNT(*) as totalStaff'),
                    DB::raw('COUNT(CASE WHEN degree = "Thạc sĩ" THEN 1 END) as masterDegree'),
                    DB::raw('COUNT(CASE WHEN degree = "Tiến sĩ" THEN 1 END) as phdDegree'),
                    DB::raw('COUNT(CASE WHEN degree = "Cử nhân" THEN 1 END) as bachelorDegree'),
                    DB::raw('COUNT(CASE WHEN degree = "Trung cấp" THEN 1 END) as intermediateDegree')
                )
                ->groupBy('departments.id', 'departments.name')
                ->get();
            
            return $this->response($statistics);
        } catch (Exception $error) {
            return $this->badRequest($error->getMessage());
        }
    }

    /**
     * Lấy danh sách nhân viên theo trình độ ngoại ngữ
     */
    public function getStaffByLanguage(string $language): JsonResponse
    {
        try {
            $staff = StaffEducation::where('foreignLanguage', 'like', '%' . $language . '%')
                ->with('user:id,firstName,lastName,username,departmentId')
                ->get();
            
            return $this->response($staff);
        } catch (Exception $error) {
            return $this->badRequest($error->getMessage());
        }
    }

    /**
     * Lấy danh sách nhân viên theo chuyên ngành đào tạo
     */
    public function getStaffBySpecialization(string $specialization): JsonResponse
    {
        try {
            $staff = StaffEducation::where('trainingSpecialization', 'like', '%' . $specialization . '%')
                ->with('user:id,firstName,lastName,username,departmentId')
                ->get();
            
            return $this->response($staff);
        } catch (Exception $error) {
            return $this->badRequest($error->getMessage());
        }
    }
}
