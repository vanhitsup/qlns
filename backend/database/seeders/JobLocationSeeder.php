<?php

namespace Database\Seeders;

use App\Models\JobLocation;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class JobLocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $job = new JobLocation();
        $job->countryName = 'Afghanistan';
        $job->jobLocation = 'Kabul';
        $job->save();

        $job = new JobLocation();
        $job->countryName = 'Iraq';
        $job->jobLocation = 'Baghdad';
        $job->save();

        $job = new JobLocation();
        $job->countryName = 'Iran';
        $job->jobLocation = 'Tehran';
        $job->save();
    }
}
