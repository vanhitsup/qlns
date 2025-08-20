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
        Schema::create('job', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('companyId');
            $table->string('jobTitle');
            $table->text('jobDescription');
            $table->text('jobRequirement');
            $table->unsignedBigInteger('jobLocationId')->nullable();
            $table->unsignedBigInteger('jobCategoryId');
            $table->integer('totalPosition');
            $table->dateTime('startTime');
            $table->dateTime('endTime');
            $table->unsignedBigInteger('jobTypeId');
            $table->unsignedBigInteger('jobWorkExperienceId');
            $table->string('jobPayBy');
            $table->double('startingSalary')->nullable();
            $table->double('maximumSalary')->nullable();
            $table->double('exactSalary')->nullable();
            $table->string('jobPaySystem')->nullable();
            $table->string('status')->default('true');
            $table->timestamps();

            // relation foreign key constraints
            $table->foreign('companyId')->references('id')->on('appSetting');
            $table->foreign('jobLocationId')->references('id')->on('jobLocation');
            $table->foreign('jobCategoryId')->references('id')->on('jobCategory');
            $table->foreign('jobTypeId')->references('id')->on('jobType');
            $table->foreign('jobWorkExperienceId')->references('id')->on('jobWorkExperience');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job');
    }
};
