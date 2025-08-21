<?php

namespace App\Services;

use App\Models\StaffResume;
use App\Models\Users;
use App\Traits\ErrorTrait;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class StaffResumeService
{
    use ErrorTrait;

    /**
     * Tạo thông tin sơ yếu lý lịch mới
     */
    public function createStaffResume(int $userId, array $resumeData): JsonResponse
    {
        DB::beginTransaction();
        try {
            $resumeData['userId'] = $userId;
            
            $staffResume = StaffResume::create($resumeData);
            
            DB::commit();
            return $this->response($staffResume);
        } catch (Exception $error) {
            DB::rollback();
            return $this->badRequest($error->getMessage());
        }
    }

    /**
     * Cập nhật thông tin sơ yếu lý lịch
     */
    public function updateStaffResume(int $userId, array $resumeData): JsonResponse
    {
        DB::beginTransaction();
        try {
            $staffResume = StaffResume::where('userId', $userId)->first();
            
            if (!$staffResume) {
                return $this->notFound('Staff resume not found');
            }
            
            $staffResume->update($resumeData);
            
            DB::commit();
            return $this->response($staffResume);
        } catch (Exception $error) {
            DB::rollback();
            return $this->badRequest($error->getMessage());
        }
    }

    /**
     * Lấy thông tin sơ yếu lý lịch theo userId
     */
    public function getStaffResumeByUserId(int $userId): JsonResponse
    {
        try {
            $staffResume = StaffResume::where('userId', $userId)->first();
            
            if (!$staffResume) {
                return $this->notFound('Staff resume not found');
            }
            
            return $this->response($staffResume);
        } catch (Exception $error) {
            return $this->badRequest($error->getMessage());
        }
    }

    /**
     * Xóa thông tin sơ yếu lý lịch
     */
    public function deleteStaffResume(int $userId): JsonResponse
    {
        DB::beginTransaction();
        try {
            $staffResume = StaffResume::where('userId', $userId)->first();
            
            if (!$staffResume) {
                return $this->notFound('Staff resume not found');
            }
            
            $staffResume->delete();
            
            DB::commit();
            return $this->success('Staff resume deleted successfully');
        } catch (Exception $error) {
            DB::rollback();
            return $this->badRequest($error->getMessage());
        }
    }

    /**
     * Lấy tất cả thông tin sơ yếu lý lịch
     */
    public function getAllStaffResumes(): JsonResponse
    {
        try {
            $staffResumes = StaffResume::with('user:id,firstName,lastName,username')->get();
            
            return $this->response($staffResumes);
        } catch (Exception $error) {
            return $this->badRequest($error->getMessage());
        }
    }

    /**
     * Tìm kiếm thông tin sơ yếu lý lịch
     */
    public function searchStaffResumes(array $filters): JsonResponse
    {
        try {
            $query = StaffResume::with('user:id,firstName,lastName,username');
            
            // Áp dụng các filter
            if (isset($filters['fullNameBirth'])) {
                $query->where('fullNameBirth', 'like', '%' . $filters['fullNameBirth'] . '%');
            }
            
            if (isset($filters['gender'])) {
                $query->where('gender', $filters['gender']);
            }
            
            if (isset($filters['nationality'])) {
                $query->where('nationality', 'like', '%' . $filters['nationality'] . '%');
            }
            
            if (isset($filters['bloodGroup'])) {
                $query->where('bloodGroup', $filters['bloodGroup']);
            }
            
            $staffResumes = $query->get();
            
            return $this->response($staffResumes);
        } catch (Exception $error) {
            return $this->badRequest($error->getMessage());
        }
    }
}
