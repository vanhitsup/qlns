<?php

namespace Database\Seeders;

use App\Models\JobCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jobCategory = new JobCategory();
        $jobCategory->jobCategoryName = 'IT';
        $jobCategory->save();

        $jobCategory = new JobCategory();
        $jobCategory->jobCategoryName = 'Engineering';
        $jobCategory->save();

        $jobCategory = new JobCategory();
        $jobCategory->jobCategoryName = 'Sales';
        $jobCategory->save();

        $jobCategory = new JobCategory();
        $jobCategory->jobCategoryName = 'Content';
        $jobCategory->save();
    }
}
