<?php

namespace Database\Seeders;

use App\Models\Priority;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PrioritySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $taskPriority = new Priority();
        $taskPriority->name = 'High';
        $taskPriority->save();


        $taskPriority = new Priority();
        $taskPriority->name = 'Highest';
        $taskPriority->save();


        $taskPriority = new Priority();
        $taskPriority->name = 'Low';
        $taskPriority->save();


        $taskPriority = new Priority();
        $taskPriority->name = 'Lowest';
        $taskPriority->save();

        $taskPriority = new Priority();
        $taskPriority->name = 'Normal';
        $taskPriority->save();


       
    }
}
