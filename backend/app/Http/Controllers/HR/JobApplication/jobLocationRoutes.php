<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HR\JobApplication\JobLocationController;

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

Route::middleware('permission:create-jobLocation')->post('/', [JobLocationController::class, 'createJobLocation']);

Route::middleware('permission:readAll-jobLocation')->get('/', [JobLocationController::class, 'getAllJobLocation']);

Route::middleware('permission:readSingle-jobLocation')->get('/{id}', [JobLocationController::class, 'getSingleJobLocation']);

Route::middleware('permission:update-jobLocation')->put('/{id}', [JobLocationController::class, 'updateJobLocation']);

Route::middleware('permission:delete-jobLocation')->patch('/{id}', [JobLocationController::class, 'deleteJobLocation']);
