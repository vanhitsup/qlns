<?php

namespace Database\Seeders;

use App\Models\LeavePolicy;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LeavePolicySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $leavePolicy = new LeavePolicy();
        $leavePolicy->name = "Policy 8-12";
        $leavePolicy->paidLeaveCount = 8;
        $leavePolicy->unpaidLeaveCount = 12;
        $leavePolicy->save();

        $leavePolicy = new LeavePolicy();
        $leavePolicy->name = "Policy 12-15";
        $leavePolicy->paidLeaveCount = 12;
        $leavePolicy->unpaidLeaveCount = 15;
        $leavePolicy->save();

        $leavePolicy = new LeavePolicy();
        $leavePolicy->name = "Policy 15-15";
        $leavePolicy->paidLeaveCount = 15;
        $leavePolicy->unpaidLeaveCount = 15;
        $leavePolicy->save();
    }
}
