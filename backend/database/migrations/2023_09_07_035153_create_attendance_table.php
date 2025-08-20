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
        Schema::create('attendance', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('userId');
            $table->string('date');
            $table->dateTime('inTime');
            $table->dateTime('outTime')->nullable();
            $table->string('ip')->nullable();
            $table->string('comment')->nullable();
            $table->integer('punchBy')->nullable();
            $table->string('totalHour')->nullable();
            $table->string('inTimeStatus')->nullable();
            $table->string('outTimeStatus')->nullable();
            $table->string('status')->default('true');
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
        Schema::dropIfExists('attendance');
    }
};
