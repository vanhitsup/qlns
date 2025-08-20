<?php

use App\Http\Controllers\HR\LeaveApplication\LeaveApplicationController;
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

Route::middleware('permission:create-leaveApplication')->post("/", [LeaveApplicationController::class, 'createSingleLeave']);

Route::middleware('permission:readAll-leaveApplication')->get("/", [LeaveApplicationController::class, 'getAllLeave']);

Route::middleware('permission:readSingle-leaveApplication')->get("/{id}", [LeaveApplicationController::class, 'getSingleLeave']);

Route::middleware('permission:update-leaveApplication')->put("/{id}", [LeaveApplicationController::class, 'grantedLeave']);

Route::middleware('permission:readSingle-leaveApplication')->get("/{id}/leaveHistory", [LeaveApplicationController::class, 'getLeaveByUserId']);
