<?php

use App\Http\Controllers\HR\LeaveApplication\LeavePolicyController;
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

Route::middleware('permission:create-leavePolicy')->post("/", [LeavePolicyController::class, 'createSingleLeavePolicy']);

Route::middleware('permission:readAll-leavePolicy')->get("/", [LeavePolicyController::class, 'getAllLeavePolicy']);

Route::middleware('permission:readSingle-leavePolicy')->get("/{id}", [LeavePolicyController::class, 'getSingleLeavePolicy']);

Route::middleware('permission:update-leavePolicy')->put("/{id}", [LeavePolicyController::class, 'updateSingleLeavePolicy']);

Route::middleware('permission:delete-leavePolicy')->patch("/{id}", [LeavePolicyController::class, 'deleteSingleLeavePolicy']);
