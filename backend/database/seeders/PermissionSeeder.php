<?php

namespace Database\Seeders;


use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        define('endpoints', [
            "rolePermission",
            "transaction",
            "permission",
            "dashboard",
            "user",
            "role",
            "designation",
            "account",
            "setting",
            "email",
            "pageSize",
            "emailConfig",
            "shift",
            "award",
            "awardHistory",
            "department",
            "designationHistory",
            "education",
            "salaryHistory",
            "employmentStatus",
            "announcement",
            "currency",
            "paymentMethod",
            "manualPayment",
            'termsAndCondition',
            'media',
            'quickLink',
            'attendance',
            'project',
            'note',
            'attachment',
            'industry',
            'leaveApplication',
            'leavePolicy',
            'publicHoliday',
            'weeklyHoliday',
            'jobApplication',
            'jobApplicationStatus',
            'jobCategory',
            'jobType',
            'job',
            'jobInterview',
            'jobInterviewStatus',
            'jobInterviewType',
            'jobLocation',
            'jobSkills',
            'jobWorkExperience',
            'taskStatus',
            'task',
            'projectTeam',
            'priority',
            'milestone',
            'tasks',
            'payroll',

        ]);

        define('PERMISSIONSTYPES', [
            'create',
            'readAll',
            "readSingle",
            'update',
            'delete',
        ]);
        foreach (endpoints as $endpoint) {
            foreach (PERMISSIONSTYPES as $permissionType) {
                $permission = new Permission();
                $permission->name = $permissionType . "-" . $endpoint;
                $permission->save();
            }
        }
    }
}
