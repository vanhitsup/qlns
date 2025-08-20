<?php

use App\Http\Controllers\HR\Project\TaskController;
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

Route::middleware('permission:create-task')->post("/", [TaskController::class, 'createTask']);

Route::middleware('permission:readAll-task')->get("/", [TaskController::class, 'getAllTask']);

Route::middleware('permission:readSingle-task')->get("/{id}", [TaskController::class, 'getSingleTask']);

Route::middleware('permission:update-task')->put("/{id}", [TaskController::class, 'updateTask']);

Route::middleware('permission:delete-task')->delete("/{id}", [TaskController::class, 'deleteTask']);

