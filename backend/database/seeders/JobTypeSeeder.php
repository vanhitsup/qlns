<?php

namespace Database\Seeders;

use App\Models\JobType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jobType = new JobType();
        $jobType->jobTypeName = 'Full Time';
        $jobType->save();

        $jobType = new JobType();
        $jobType->jobTypeName = 'Part Time';
        $jobType->save();

        $jobType = new JobType();
        $jobType->jobTypeName = 'On Contact';
        $jobType->save();

        $jobType = new JobType();
        $jobType->jobTypeName = 'Internship';
        $jobType->save();

        $jobType = new JobType();
        $jobType->jobTypeName = 'Remote';
        $jobType->save();
    }
}
