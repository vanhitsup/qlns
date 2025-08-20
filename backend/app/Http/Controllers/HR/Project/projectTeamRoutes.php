<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HR\Project\ProjectTeamController;


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

Route::middleware('permission:create-projectTeam')->post("/", [ProjectTeamController::class, 'createProjectTeam']);

Route::middleware('permission:readAll-projectTeam')->get("/", [ProjectTeamController::class, 'getAllProjectTeams']);

Route::middleware('permission:readAll-projectTeam')->get("/{id}/project", [ProjectTeamController::class, 'getProjectTeamByProjectId']);

Route::middleware('permission:readSingle-projectTeam')->get("/{id}", [ProjectTeamController::class, 'getSingleProjectTeam']);

Route::middleware('permission:update-projectTeam')->put("/{id}", [ProjectTeamController::class, 'updateProjectTeam']);

Route::middleware('permission:delete-projectTeam')->patch("/{id}", [ProjectTeamController::class, 'deleteProjectTeam']);
