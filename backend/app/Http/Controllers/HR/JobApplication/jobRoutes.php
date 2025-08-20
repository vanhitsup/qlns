<?php

use App\Http\Controllers\HR\JobApplication\JobController;
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

Route::middleware('permission:create-job')->post('/', [JobController::class, 'createJob']);

Route::get('/', [JobController::class, 'getAllJob']);

Route::get('/{id}', [JobController::class, 'getSingleJob']);

Route::middleware('permission:update-job')->put('/{id}', [JobController::class, 'updateJob']);

Route::middleware('permission:delete-job')->patch('/{id}', [JobController::class, 'deleteJob']);
