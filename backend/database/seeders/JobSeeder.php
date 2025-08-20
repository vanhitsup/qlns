<?php

namespace Database\Seeders;

use App\Models\Job;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class JobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $job = new Job();
        $job->companyId = 1;
        $job->jobDescription = 'We are looking for a Software Engineer to join our team';
        $job->jobTitle = 'Software Engineer';
        $job->jobLocationId = 1;
        $job->jobCategoryId = 1;
        $job->jobTypeId = 1;
        $job->totalPosition = 5;
        $job->jobWorkExperienceId = 1;
        $job->jobRequirement = 'Bachelor degree in Computer Science or related field';
        $job->startTime = '2021-10-01 08:00:00';
        $job->endTime = '2021-10-31 17:00:00';
        $job->jobPayBy = 'Monthly';
        $job->startingSalary = 1000;
        $job->maximumSalary = 2000;
        $job->exactSalary = 1500;
        $job->jobPaySystem = 'Fixed';
        $job->save();
    }
}
