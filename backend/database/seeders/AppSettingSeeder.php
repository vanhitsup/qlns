<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Models\AppSetting;

class AppSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $setting = new AppSetting();
        $setting->companyName = 'HRM OS';
        $setting->dashboardType = 'inventory';
        $setting->tagLine = 'Manage your HRM with ease';
        $setting->address = '1234 North Avenue Luke Lane, South Bend, IN 360001';
        $setting->phone = '+880 99 2021 5555';
        $setting->email = 'solution@omega.ac';
        $setting->website = 'https://solution.omega.ac';
        $setting->footer = 'HRM OS copyright by Omega Solution LLC';
        $setting->logo = null;
        $setting->currencyId = 3;

        $setting->save();
    }
}
