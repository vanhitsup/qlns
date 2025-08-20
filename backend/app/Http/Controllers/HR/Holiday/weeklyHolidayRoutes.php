<?php

use App\Http\Controllers\HR\Holiday\WeeklyHolidayController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('permission:create-weeklyHoliday')->post("/", [WeeklyHolidayController::class, 'createSingleWeeklyHoliday']);

Route::middleware('permission:readAll-weeklyHoliday')->get("/", [WeeklyHolidayController::class, 'getAllWeeklyHoliday']);

Route::middleware('permission:readSingle-weeklyHoliday')->get("/{id}", [WeeklyHolidayController::class, 'getSingleWeeklyHoliday']);

Route::middleware('permission:update-weeklyHoliday')->put("/{id}", [WeeklyHolidayController::class, 'updateSingleWeeklyHoliday']);

Route::middleware('permission:delete-weeklyHoliday')->delete("/{id}", [WeeklyHolidayController::class, 'deleteSingleWeeklyHoliday']);
