<?php

namespace Database\Seeders;

use App\Models\JobInterview;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class JobInterviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $job = new JobInterview();
        $job->jobApplicationId = 1;
        $job->scheduleDate = '2021-12-12';
        $job->scheduleTime = '10:00 AM';
        $job->interviewStatusId = 1;
        $job->comment = 'Please be on time';
        
        $job->save();

        
    }
}
