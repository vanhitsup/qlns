<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\JobWorkExperience;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class JobWorkExperienceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $job = new JobWorkExperience();
        $job->workExperience = '1-2 years';
        $job->save();

        $job = new JobWorkExperience();
        $job->workExperience = '3-5 years';
        $job->save();

        $job = new JobWorkExperience();
        $job->workExperience = '6-10 years';
        $job->save();
    }
}
