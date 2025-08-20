<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HR\JobApplication\JobApplicationController;

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

Route::middleware(['fileUploader:1'])->post('/', [JobApplicationController::class, 'createJobApplication']);

Route::middleware('permission:readAll-jobApplication')->get('/', [JobApplicationController::class, 'getAllJobApplication']);

Route::middleware('permission:readSingle-jobApplication')->get('/{id}', [JobApplicationController::class, 'getSingleJobApplication']);

Route::middleware(['permission:update-jobApplication', 'fileUploader:1'])->put('/{id}', [JobApplicationController::class, 'updateJobApplication']);

Route::middleware('permission:delete-jobApplication')->patch('/{id}', [JobApplicationController::class, 'deleteJobApplication']);
