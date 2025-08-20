<?php
use App\Http\Controllers\SetupController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;




Route::get('/', function () {
    
    if(env('APP_SETUP') === false) {
        return redirect('/install');
    }
    return view('welcome');
});

Route::get('/install', [App\Http\Controllers\SetupController::class, 'index']);
Route::post('/install', [App\Http\Controllers\SetupController::class, 'setup']);
