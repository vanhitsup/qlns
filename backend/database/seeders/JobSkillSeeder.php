<?php

namespace Database\Seeders;

use App\Models\JobSkills;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobSkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $jobSkill = new JobSkills();
        $jobSkill->jobCategoryId = 1;
        $jobSkill->jobSkillName = 'Node.js';
        $jobSkill->save();

        $jobSkill = new JobSkills();
        $jobSkill->jobCategoryId = 2;
        $jobSkill->jobSkillName = 'Laravel';
        $jobSkill->save();

        $jobSkill = new JobSkills();
        $jobSkill->jobCategoryId = 3;
        $jobSkill->jobSkillName = 'Vue.js';
        $jobSkill->save();

    }
}
