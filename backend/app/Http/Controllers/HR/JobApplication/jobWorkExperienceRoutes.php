<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HR\JobApplication\JobWorkExperienceController;

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

Route::middleware('permission:create-jobWorkExperience')->post('/', [JobWorkExperienceController::class, 'createJobWorkExperience']);

Route::middleware('permission:readAll-jobWorkExperience')->get('/', [JobWorkExperienceController::class, 'getAllJobWorkExperience']);

Route::middleware('permission:readSingle-jobWorkExperience')->get('/{id}', [JobWorkExperienceController::class, 'getSingleJobWorkExperience']);

Route::middleware('permission:update-jobWorkExperience')->put('/{id}', [JobWorkExperienceController::class, 'updateJobWorkExperience']);

Route::middleware('permission:delete-jobWorkExperience')->patch('/{id}', [JobWorkExperienceController::class, 'deleteJobWorkExperience']);
