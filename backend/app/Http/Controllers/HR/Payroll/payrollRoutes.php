<?php

use App\Http\Controllers\HR\Payroll\PayrollController;
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

Route::middleware('permission:readAll-payroll')->get("/", [PayrollController::class, 'calculatePayroll']);

Route::middleware('permission:create-payroll')->post("/", [PayrollController::class, 'generatePayslip']);

Route::middleware('permission:readAll-payroll')->get("/all", [PayrollController::class, 'getAllPayslip']);

Route::middleware('permission:readSingle-payroll')->get("/{id}", [PayrollController::class, 'getSinglePayslip']);

Route::middleware('permission:update-payroll')->put("/{id}", [PayrollController::class, 'updatePayslip']);

Route::middleware('permission:update-payroll')->put("/payment/{id}", [PayrollController::class, 'makePayment']);

Route::middleware('permission:readSingle-payroll')->get("/user/{id}", [PayrollController::class, 'getPayslipTransactionByUserId']);