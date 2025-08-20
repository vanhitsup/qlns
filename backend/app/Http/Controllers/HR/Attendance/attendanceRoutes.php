<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HR\Attendance\AttendanceController;


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


Route::middleware('permission:create-attendance')->post("/", [AttendanceController::class, 'createAttendance']);

Route::middleware('permission:readAll-attendance')->get("/", [AttendanceController::class, 'getAllAttendance']);

Route::middleware('permission:readSingle-attendance')->get("/{id}", [AttendanceController::class, 'getSingleAttendance']);

Route::middleware('permission:readAll-attendance')->get("/{id}/user", [AttendanceController::class, 'getAttendanceByUserId']);

Route::middleware('permission:readSingle-attendance')->get("/{id}/last", [AttendanceController::class, 'getLastAttendanceByUserId']);
