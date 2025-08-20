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
        Schema::create('jobInterview', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('jobApplicationId');
            $table->date('scheduleDate');
            $table->time('scheduleTime');
            $table->string('comment')->nullable();
            $table->string('interviewStatus')->default('PENDING');
            $table->string('status')->default('true');
            $table->timestamps();

            // foreign key relation constraints
            $table->foreign('jobApplicationId')->references('id')->on('jobApplication');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobInterview');
    }
};
