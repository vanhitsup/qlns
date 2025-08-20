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
        Schema::create('milestone', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('projectId');
            $table->string('name');
            $table->dateTime('startDate');
            $table->dateTime('endDate');
            $table->string('description');
            $table->string('status')->default("PENDING");
            $table->timestamps();

            $table->foreign('projectId')->references('id')->on('project')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('milestone');
    }
};
