<?php

namespace Database\Seeders;

use App\Mail\JobApplicationStatus;
use App\Models\Job;
use App\Models\JobApplication;
use App\Models\JobCategory;
use App\Models\JobLocation;
use App\Models\JobType;
use App\Models\JobWorkExperience;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        if (env('APP_DEBUG') === true) {
            $this->call([
                RoleSeeder::class,
                awardSeeder::class,
                ShiftSeeder::class,
                EmploymentSeeder::class,
                DesignationSeeder::class,
                DepartmentSeeder::class,
                UsersSeeder::class,
                PermissionSeeder::class,
                RolePermissionSeeder::class,
                CurrencySeeder::class,
                AppSettingSeeder::class,
                AccountSeeder::class,
                SubAccountSeeder::class,
                PageSizeSeeder::class,
                QuickLinksSeeder::class,
                IndustrySeeder::class,
                JobCategorySeeder::class,
                JobTypeSeeder::class,
                JobLocationSeeder::class,
                JobSkillSeeder::class,
                JobWorkExperienceSeeder::class,
                JobSeeder::class,
                JobApplicationStatusSeeder::class,
                JobApplicationSeeder::class,
                PrioritySeeder::class,
            ]);
        } else {
            $this->call([
                RoleSeeder::class,
                awardSeeder::class,
                ShiftSeeder::class,
                EmploymentSeeder::class,
                DesignationSeeder::class,
                DepartmentSeeder::class,
                UsersSeeder::class,
                PermissionSeeder::class,
                RolePermissionSeeder::class,
                CurrencySeeder::class,
                AppSettingSeeder::class,
                AccountSeeder::class,
                SubAccountSeeder::class,
                PageSizeSeeder::class,
                PaymentMethodSeeder::class,
                QuickLinksSeeder::class,
                PrioritySeeder::class,
                JobApplicationStatusSeeder::class,


            ]);
        }

    }
}
