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
        Schema::create('projectTeam', function (Blueprint $table) {
            $table->id();
            $table->string("projectTeamName");
            $table->unsignedBigInteger("projectId");
            $table->string("status")->default("true");
            $table->timestamps();

            $table->foreign('projectId')->references('id')->on('project')->onDelete('cascade')->onUpdate('cascade');;
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projectTeam');
    }
};
