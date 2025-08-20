<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PublicHoliday;

class PublicHolidaySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */


    public function run(): void
    {
        $currentDate = now();
        $publicHoliday = new PublicHoliday();
        $publicHoliday->name = 'New Year';
        $publicHoliday->date = $currentDate->format('Y-m-d');
        $publicHoliday->save();

        $publicHoliday = new PublicHoliday();
        $publicHoliday->name = 'Independence Day';
        $publicHoliday->date = $currentDate->addDays(3)->format('Y-m-d');
        $publicHoliday->save();

        $publicHoliday = new PublicHoliday();
        $publicHoliday->name = 'Christmas';
        $publicHoliday->date = $currentDate->addDays(9)->format('Y-m-d');
        $publicHoliday->save();
    }
}
