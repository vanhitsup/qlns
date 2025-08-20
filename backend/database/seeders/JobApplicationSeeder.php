<?php

namespace Database\Seeders;

use App\Models\JobApplication;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class JobApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jobApplication = new JobApplication();
        $jobApplication->jobId = 1;
        $jobApplication->name = 'John Doe';
        $jobApplication->email = 'test@gmail.com';
        $jobApplication->phone = '1234567890';
        $jobApplication->address = '123 Main St, New York, NY 10030';
        $jobApplication->cv = 'cv.pdf';
        $jobApplication->coverLater = 'cover.pdf';
        $jobApplication->applicationStatusId = 1;
        $jobApplication->save();
       
    }
}
