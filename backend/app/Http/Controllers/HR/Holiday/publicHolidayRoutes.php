<?php

use App\Http\Controllers\HR\Holiday\PublicHolidayController;
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

Route::middleware('permission:create-publicHoliday')->post("/", [PublicHolidayController::class, 'createPublicHoliday']);

Route::middleware('permission:readAll-publicHoliday')->get("/", [PublicHolidayController::class, 'getAllPublicHoliday']);

Route::middleware('permission:readSingle-publicHoliday')->get("/{id}", [PublicHolidayController::class, 'getSinglePublicHoliday']);

Route::middleware('permission:update-publicHoliday')->put("/{id}", [PublicHolidayController::class, 'updateSinglePublicHoliday']);

Route::middleware('permission:delete-publicHoliday')->delete("/{id}", [PublicHolidayController::class, 'deleteSinglePublicHoliday']);
