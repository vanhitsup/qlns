<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HR\JobApplication\JobCategoryController;

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

Route::middleware('permission:create-jobCategory')->post('/', [JobCategoryController::class, 'createJobCategory']);

Route::middleware('permission:readAll-jobCategory')->get('/', [JobCategoryController::class, 'getAllJobCategory']);

Route::middleware('permission:readSingle-jobCategory')->get('/{id}', [JobCategoryController::class, 'getSingleJobCategory']);

Route::middleware('permission:update-jobCategory')->put('/{id}', [JobCategoryController::class, 'updateJobCategory']);

Route::middleware('permission:delete-jobCategory')->patch('/{id}', [JobCategoryController::class, 'deleteJobCategory']);
