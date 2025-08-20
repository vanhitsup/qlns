<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HR\JobApplication\JobApplicationStatusController;

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

Route::middleware('permission:create-jobApplicationStatus')->post('/', [JobApplicationStatusController::class, 'createJobApplicationStatus']);

Route::middleware('permission:readAll-jobApplicationStatus')->get('/', [JobApplicationStatusController::class, 'getAllJobApplicationStatus']);

Route::middleware('permission:readSingle-jobApplicationStatus')->get('/{id}', [JobApplicationStatusController::class, 'getSingleJobApplicationStatus']);

Route::middleware('permission:update-jobApplicationStatus')->put('/{id}', [JobApplicationStatusController::class, 'updateJobApplicationStatus']);

Route::middleware('permission:delete-jobApplicationStatus')->patch('/{id}', [JobApplicationStatusController::class, 'deleteJobApplicationStatus']);
