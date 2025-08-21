<?php

namespace App\Services;

use App\Models\StaffPositionSalary;
use App\Models\Users;
use App\Traits\ErrorTrait;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class StaffPositionSalaryService
{
    use ErrorTrait;

    /**
     * Tạo thông tin chức danh và mức lương mới
     */
    public function createStaffPositionSalary(int $userId, array $positionSalaryData): JsonResponse
    {
        DB::beginTransaction();
        try {
            $positionSalaryData['userId'] = $userId;
            
            $staffPositionSalary = StaffPositionSalary::create($positionSalaryData);
            
            DB::commit();
            return $this->response($staffPositionSalary);
        } catch (Exception $error) {
            DB::rollback();
            return $this->badRequest($error->getMessage());
        }
    }

    /**
     * Cập nhật thông tin chức danh và mức lương
     */
    public function updateStaffPositionSalary(int $userId, array $positionSalaryData): JsonResponse
    {
        DB::beginTransaction();
        try {
            $staffPositionSalary = StaffPositionSalary::where('userId', $userId)->first();
            
            if (!$staffPositionSalary) {
                return $this->notFound('Staff position salary not found');
            }
            
            $staffPositionSalary->update($positionSalaryData);
            
            DB::commit();
            return $this->response($staffPositionSalary);
        } catch (Exception $error) {
            DB::rollback();
            return $this->badRequest($error->getMessage());
        }
    }

    /**
     * Lấy thông tin chức danh và mức lương theo userId
     */
    public function getStaffPositionSalaryByUserId(int $userId): JsonResponse
    {
        try {
            $staffPositionSalary = StaffPositionSalary::where('userId', $userId)->first();
            
            if (!$staffPositionSalary) {
                return $this->notFound('Staff position salary not found');
            }
            
            return $this->response($staffPositionSalary);
        } catch (Exception $error) {
            return $this->badRequest($error->getMessage());
        }
    }

    /**
     * Xóa thông tin chức danh và mức lương
     */
    public function deleteStaffPositionSalary(int $userId): JsonResponse
    {
        DB::beginTransaction();
        try {
            $staffPositionSalary = StaffPositionSalary::where('userId', $userId)->first();
            
            if (!$staffPositionSalary) {
                return $this->notFound('Staff position salary not found');
            }
            
            $staffPositionSalary->delete();
            
            DB::commit();
            return $this->success('Staff position salary deleted successfully');
        } catch (Exception $error) {
            DB::rollback();
            return $this->badRequest($error->getMessage());
        }
    }

    /**
     * Lấy tất cả thông tin chức danh và mức lương
     */
    public function getAllStaffPositionSalaries(): JsonResponse
    {
        try {
            $staffPositionSalaries = StaffPositionSalary::with('user:id,firstName,lastName,username')->get();
            
            return $this->response($staffPositionSalaries);
        } catch (Exception $error) {
            return $this->badRequest($error->getMessage());
        }
    }

    /**
     * Tìm kiếm thông tin chức danh và mức lương
     */
    public function searchStaffPositionSalaries(array $filters): JsonResponse
    {
        try {
            $query = StaffPositionSalary::with('user:id,firstName,lastName,username');
            
            // Áp dụng các filter
            if (isset($filters['positionTitle'])) {
                $query->where('positionTitle', 'like', '%' . $filters['positionTitle'] . '%');
            }
            
            if (isset($filters['salaryLevel'])) {
                $query->where('salaryLevel', 'like', '%' . $filters['salaryLevel'] . '%');
            }
            
            if (isset($filters['jobPosition'])) {
                $query->where('jobPosition', 'like', '%' . $filters['jobPosition'] . '%');
            }
            
            if (isset($filters['minSalary'])) {
                $query->where('salaryAmount', '>=', $filters['minSalary']);
            }
            
            if (isset($filters['maxSalary'])) {
                $query->where('salaryAmount', '<=', $filters['maxSalary']);
            }
            
            $staffPositionSalaries = $query->get();
            
            return $this->response($staffPositionSalaries);
        } catch (Exception $error) {
            return $this->badRequest($error->getMessage());
        }
    }

    /**
     * Lấy thống kê lương theo phòng ban
     */
    public function getSalaryStatisticsByDepartment(): JsonResponse
    {
        try {
            $statistics = StaffPositionSalary::join('users', 'staff_position_salaries.userId', '=', 'users.id')
                ->join('departments', 'users.departmentId', '=', 'departments.id')
                ->select(
                    'departments.name as departmentName',
                    DB::raw('COUNT(*) as totalStaff'),
                    DB::raw('AVG(CAST(salaryAmount AS DECIMAL(10,2))) as averageSalary'),
                    DB::raw('MIN(CAST(salaryAmount AS DECIMAL(10,2))) as minSalary'),
                    DB::raw('MAX(CAST(salaryAmount AS DECIMAL(10,2))) as maxSalary')
                )
                ->whereNotNull('salaryAmount')
                ->groupBy('departments.id', 'departments.name')
                ->get();
            
            return $this->response($statistics);
        } catch (Exception $error) {
            return $this->badRequest($error->getMessage());
        }
    }
}
