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
            Schema::create('project', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('projectManagerId');
                $table->string('name');
                $table->dateTime('startDate');
                $table->dateTime('endDate');
                $table->longText('description');
                $table->string('status')->default("PENDING");
                $table->timestamps();

                $table->foreign('projectManagerId')->references('id')->on('users');
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project');
    }
};
