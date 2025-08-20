<?php

namespace Database\Seeders;

use App\Models\WeeklyHoliday;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WeeklyHolidaySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $weeklyHoliday = new WeeklyHoliday();
        $weeklyHoliday->name = "Saturday-Thursday";
        $weeklyHoliday->startDay = "Saturday";
        $weeklyHoliday->endDay = "Thursday";
        $weeklyHoliday->save();

        $weeklyHoliday = new WeeklyHoliday();
        $weeklyHoliday->name = "Sunday-Friday";
        $weeklyHoliday->startDay = "Sunday";
        $weeklyHoliday->endDay = "Friday";
        $weeklyHoliday->save();
    }
}
