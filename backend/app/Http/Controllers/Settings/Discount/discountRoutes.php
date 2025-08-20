<?php

use App\Http\Controllers\Settings\Discount\DiscountController;
use Illuminate\Support\Facades\Route;




Route::middleware('permission:create-discount')->post("/", [DiscountController::class, 'createSingleDiscount']);

Route::middleware('permission:readAll-discount')->get("/", [DiscountController::class, 'getAllDiscount']);

Route::middleware('permission:readAll-discount')->get("/{id}", [DiscountController::class, 'getSingleDiscount']);

Route::middleware('permission:update-discount')->put("/{id}", [DiscountController::class, 'updateSingleDiscount']);

Route::middleware('permission:delete-discount')->patch("/{id}", [DiscountController::class, 'deleteSingleDiscount']);


