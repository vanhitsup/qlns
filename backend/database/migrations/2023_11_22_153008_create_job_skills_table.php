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
        Schema::create('jobSkills', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('jobCategoryId');
            $table->string('jobSkillName');
            $table->string('status')->default('true');
            $table->timestamps();

            // foreign key relation constraint
            $table->foreign('jobCategoryId')->references('id')->on('jobCategory');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobSkills');
    }
};
