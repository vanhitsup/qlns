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
        Schema::create('skillsByJob', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('jobId');
            $table->unsignedBigInteger('jobSkillId');
            $table->string('status')->default('true');
            $table->timestamps();

            $table->foreign('jobId')->references('id')->on('job');
            $table->foreign('jobSkillId')->references('id')->on('jobSkills');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skillsByJob');
    }
};
