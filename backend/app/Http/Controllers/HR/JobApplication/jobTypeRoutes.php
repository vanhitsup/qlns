<?php

use App\Http\Controllers\HR\JobApplication\JobTypeController;
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

Route::middleware('permission:create-jobType')->post('/', [JobTypeController::class, 'createJobType']);

Route::middleware('permission:readAll-jobType')->get('/', [JobTypeController::class, 'getAllJobType']);

Route::middleware('permission:readSingle-jobType')->get('/{id}', [JobTypeController::class, 'getSingleJobType']);

Route::middleware('permission:update-jobType')->put('/{id}', [JobTypeController::class, 'updateJobType']);

Route::middleware('permission:delete-jobType')->patch('/{id}', [JobTypeController::class, 'deleteJobType']);
