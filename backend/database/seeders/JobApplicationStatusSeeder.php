<?php

namespace Database\Seeders;

use App\Models\JobApplicationStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobApplicationStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jobApplicationStatus = new JobApplicationStatus();
        $jobApplicationStatus->applicationStatus = 'APPLIED';
        $jobApplicationStatus->save();

        $jobApplicationStatus = new JobApplicationStatus();
        $jobApplicationStatus->applicationStatus = 'REVIEWING';
        $jobApplicationStatus->save();

        $jobApplicationStatus = new JobApplicationStatus();
        $jobApplicationStatus->applicationStatus = 'SELECTED FOR INTERVIEW';
        $jobApplicationStatus->save();

        $jobApplicationStatus = new JobApplicationStatus();
        $jobApplicationStatus->applicationStatus = 'INTERVIEWING';
        $jobApplicationStatus->save();

        $jobApplicationStatus = new JobApplicationStatus();
        $jobApplicationStatus->applicationStatus = 'INTERVIEWED';
        $jobApplicationStatus->save();

        $jobApplicationStatus = new JobApplicationStatus();
        $jobApplicationStatus->applicationStatus = 'HIRED';
        $jobApplicationStatus->save();

        $jobApplicationStatus = new JobApplicationStatus();
        $jobApplicationStatus->applicationStatus = 'REJECTED';
        $jobApplicationStatus->save();

        $jobApplicationStatus = new JobApplicationStatus();
        $jobApplicationStatus->applicationStatus = 'CANCELLED';
        $jobApplicationStatus->save();
    }
}
