<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HR\JobApplication\JobInterviewController;

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

Route::middleware('permission:create-jobInterview')->post('/', [JobInterviewController::class, 'createJobInterview']);

Route::middleware('permission:readAll-jobInterview')->get('/', [JobInterviewController::class, 'getAllJobInterview']);

Route::middleware('permission:readSingle-jobInterview')->get('/{id}', [JobInterviewController::class, 'getSingleJobInterview']);

Route::middleware('permission:update-jobInterview')->put('/{id}', [JobInterviewController::class, 'updateJobInterview']);

Route::middleware('permission:delete-jobInterview')->patch('/{id}', [JobInterviewController::class, 'deleteJobInterview']);
