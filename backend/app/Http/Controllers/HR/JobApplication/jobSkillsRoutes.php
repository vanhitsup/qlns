<?php

use App\Http\Controllers\HR\JobApplication\JobSkillsController;
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

Route::middleware('permission:create-jobSkills')->post('/', [JobSkillsController::class, 'createJobSkills']);

Route::middleware('permission:readAll-jobSkills')->get('/', [JobSkillsController::class, 'getAllJobSkills']);

Route::middleware('permission:readSingle-jobSkills')->get('/{id}', [JobSkillsController::class, 'getSingleJobSkills']);

Route::middleware('permission:update-jobSkills')->put('/{id}', [JobSkillsController::class, 'updateJobSkills']);

Route::middleware('permission:delete-jobSkills')->patch('/{id}', [JobSkillsController::class, 'deleteJobSkills']);

Route::middleware('permission:readAll-jobSkills')->get('/byJobCategoryId/{id}', [JobSkillsController::class, 'getAllJobSkillsByJobCategoryId']);
