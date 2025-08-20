<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payslip', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('userId');
            $table->integer('salaryMonth');
            $table->integer('salaryYear');
            $table->float('salary');
            $table->integer('paidLeave');
            $table->integer('unpaidLeave');
            $table->integer('monthlyHoliday');
            $table->integer('publicHoliday');
            $table->integer('workDay');
            $table->float('shiftWiseWorkHour');
            $table->float('monthlyWorkHour');
            $table->float('hourlySalary');
            $table->float('workingHour');
            $table->float('salaryPayable');
            $table->float('bonus');
            $table->string('bonusComment')->nullable();
            $table->float('deduction');
            $table->string('deductionComment')->nullable();
            $table->float('totalPayable');
            $table->string('paymentStatus')->default('UNPAID');
            $table->float('totalDueAmount');
            $table->timestamps();

            // foreign key constraints
            $table->foreign('userId')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payslip');
    }
};
