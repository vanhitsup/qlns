<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to your application's "home" route.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    public function boot(): void
    {
        RateLimiter::for('global', function (Request $request) {
            return Limit::perMinute(1000)->by($request->ip())->response(function () {
                return response()->json(['error' => 'Too Many Attempts.'], 429);
            });
        });

        $this->routes(function () {
            Route::middleware('web')
                ->group(base_path('routes/web.php'));
            //Accounting
            Route::middleware('account')
                ->prefix('account')
                ->group(base_path('app/Http/Controllers/Accounting/Account/accountRoutes.php'));
            Route::middleware('transaction')
                ->prefix('transaction')
                ->group(base_path('app/Http/Controllers/Accounting/Transaction/transactionRoutes.php'));

            //Task
            Route::middleware('tasks')
                ->prefix('task')
                ->group(base_path('app/Http/Controllers/Tasks/tasksRoutes.php'));
            //Email
            Route::middleware('email-config')
                ->prefix('email-config')
                ->group(base_path('app/Http/Controllers/Email/emailConfigRoutes.php'));
            Route::middleware('email')
                ->prefix('email')
                ->group(base_path('app/Http/Controllers/Email/emailRoutes.php'));
            Route::middleware('email-invoice')
                ->prefix('email-invoice')
                ->group(base_path('app/Http/Controllers/Email/sendEmailRoutes.php'));

            //Files
            Route::middleware('files')
                ->prefix('files')
                ->group(base_path('app/Http/Controllers/Files/filesRoutes.php'));


            //HR
            Route::middleware('hrm-dashboard')
                ->prefix('hrm-dashboard')
                ->group(base_path('app/Http/Controllers/HR/Dashboard/hrmDashboardRoutes.php'));
            Route::middleware('announcement')
                ->prefix('announcement')
                ->group(base_path('app/Http/Controllers/HR/Announcement/announcementRoutes.php'));
            Route::middleware('award')
                ->prefix('award')
                ->group(base_path('app/Http/Controllers/HR/Award/awardRoutes.php'));
            Route::middleware('award-history')
                ->prefix('award-history')
                ->group(base_path('app/Http/Controllers/HR/Award/awardHistoryRoutes.php'));
            Route::middleware('department')
                ->prefix('department')
                ->group(base_path('app/Http/Controllers/HR/Department/departmentRoutes.php'));
            Route::middleware('designation')
                ->prefix('designation')
                ->group(base_path('app/Http/Controllers/HR/Designation/designationRoutes.php'));
            Route::middleware('designation-history')
                ->prefix('designation-history')
                ->group(base_path('app/Http/Controllers/HR/Designation/designationHistoryRoutes.php'));
            Route::middleware('education')
                ->prefix('education')
                ->group(base_path('app/Http/Controllers/HR/Education/educationRoutes.php'));
            Route::middleware('employment-status')
                ->prefix('employment-status')
                ->group(base_path('app/Http/Controllers/HR/EmploymentStatus/employmentStatusRoutes.php'));
            Route::middleware('permission')
                ->prefix('permission')
                ->group(base_path('app/Http/Controllers/HR/RolePermission/permissionRoutes.php'));
            Route::middleware('role')
                ->prefix('role')
                ->group(base_path('app/Http/Controllers/HR/RolePermission/roleRoutes.php'));
            Route::middleware('role-permission')
                ->prefix('role-permission')
                ->group(base_path('app/Http/Controllers/HR/RolePermission/rolePermissionRoutes.php'));
            Route::middleware('salary-history')
                ->prefix('salary-history')
                ->group(base_path('app/Http/Controllers/HR/SalaryHistory/salaryHistoryRoutes.php'));
            Route::middleware('shift')
                ->prefix('shift')
                ->group(base_path('app/Http/Controllers/HR/Shift/shiftRoutes.php'));

            Route::middleware('public-holiday')
                ->prefix('public-holiday')
                ->group(base_path('app/Http/Controllers/HR/Holiday/publicHolidayRoutes.php'));
            Route::middleware('weekly-holiday')
                ->prefix('weekly-holiday')
                ->group(base_path('app/Http/Controllers/HR/Holiday/weeklyHolidayRoutes.php'));

            Route::middleware('leave-policy')
                ->prefix('leave-policy')
                ->group(base_path('app/Http/Controllers/HR/LeaveApplication/leavePolicyRoutes.php'));
            Route::middleware('leave-application')
                ->prefix('leave-application')
                ->group(base_path('app/Http/Controllers/HR/LeaveApplication/leaveApplicationRoutes.php'));
            Route::middleware('attendance')
                ->prefix('attendance')
                ->group(base_path('app/Http/Controllers/HR/Attendance/attendanceRoutes.php'));
            Route::middleware('payroll')
                ->prefix('payroll')
                ->group(base_path('app/Http/Controllers/HR/Payroll/payrollRoutes.php'));

            //project
            Route::middleware('project')
                ->prefix('project')
                ->group(base_path('app/Http/Controllers/HR/Project/projectRoutes.php'));
            Route::middleware('milestone')
                ->prefix('milestone')
                ->group(base_path('app/Http/Controllers/HR/Project/milestoneRoutes.php'));
            Route::middleware('tasks')
                ->prefix('tasks')
                ->group(base_path('app/Http/Controllers/HR/Project/taskRoutes.php'));
            Route::middleware('task-status')
                ->prefix('task-status')
                ->group(base_path('app/Http/Controllers/HR/Project/taskStatusRoutes.php'));
            Route::middleware('project-team')
                ->prefix('project-team')
                ->group(base_path('app/Http/Controllers/HR/Project/projectTeamRoutes.php'));


            Route::middleware('job-category')
                ->prefix('job-category')
                ->group(base_path('app/Http/Controllers/HR/JobApplication/jobCategoryRoutes.php'));
            Route::middleware('job-type')
                ->prefix('job-type')
                ->group(base_path('app/Http/Controllers/HR/JobApplication/jobTypeRoutes.php'));
            Route::middleware('job-location')
                ->prefix('job-location')
                ->group(base_path('app/Http/Controllers/HR/JobApplication/jobLocationRoutes.php'));
            Route::middleware('job-skills')
                ->prefix('job-skills')
                ->group(base_path('app/Http/Controllers/HR/JobApplication/jobSkillsRoutes.php'));
            Route::middleware('job-workExperience')
                ->prefix('job-workExperience')
                ->group(base_path('app/Http/Controllers/HR/JobApplication/jobWorkExperienceRoutes.php'));
            Route::middleware('job')
                ->prefix('job')
                ->group(base_path('app/Http/Controllers/HR/JobApplication/jobRoutes.php'));
            Route::middleware('job-application')
                ->prefix('job-application')
                ->group(base_path('app/Http/Controllers/HR/JobApplication/jobApplicationRoutes.php'));
            Route::middleware('job-interview')
                ->prefix('job-interview')
                ->group(base_path('app/Http/Controllers/HR/JobApplication/jobInterviewRoutes.php'));
            Route::middleware('job-applicationStatus')
                ->prefix('job-applicationStatus')
                ->group(base_path('app/Http/Controllers/HR/JobApplication/jobApplicationStatusRoutes.php'));


            //Payment
            route::middleware('payment-method')
                ->prefix('payment-method')
                ->group(base_path('app/Http/Controllers/Payment/PaymentMethod/paymentMethodRoutes.php'));
            route::middleware('manual-payment')
                ->prefix('manual-payment')
                ->group(base_path('app/Http/Controllers/Payment/ManualPayment/manualPaymentRoutes.php'));

            //Settings
            Route::middleware('setting')
                ->prefix('setting')
                ->group(base_path('app/Http/Controllers/Settings/AppSetting/appSettingRoutes.php'));
            Route::middleware('priority')
                ->prefix('priority')
                ->group(base_path('app/Http/Controllers/Settings/Priority/priorityRoutes.php'));
            route::middleware('currency')
                ->prefix('currency')
                ->group(base_path('app/Http/Controllers/Settings/Currency/currencyRoutes.php'));
            Route::middleware('page-size')
                ->prefix('page-size')
                ->group(base_path('app/Http/Controllers/Settings/PageSize/pageSizeRoutes.php'));
            route::middleware('terms-and-condition')
                ->prefix('terms-and-condition')
                ->group(base_path('app/Http/Controllers/Settings/TermsAndCondition/termsAndConditionRoutes.php'));

            route::middleware('quick-link')
                ->prefix('quick-link')
                ->group(base_path('app/Http/Controllers/Settings/QuickLink/quickLinkRoutes.php'));
            //user
            Route::middleware('user')
                ->prefix('user')
                ->group(base_path('app/Http/Controllers/User/userRoutes.php'));

            //media
            Route::middleware('media')
                ->prefix('media')
                ->group(base_path('app/Http/Controllers/MediaFiles/MediaFileRoutes.php'));
        });
    }
}
