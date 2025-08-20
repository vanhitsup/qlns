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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('priorityId')->nullable();
            $table->unsignedBigInteger('taskTypeId')->nullable();
            $table->unsignedBigInteger('taskStatusId')->nullable();
            $table->unsignedBigInteger('projectId')->nullable();
            $table->unsignedBigInteger('assigneeId')->nullable();
            $table->unsignedBigInteger('milestoneId')->nullable();
            $table->unsignedBigInteger('teamId')->nullable();
            $table->dateTime('startDate')->nullable();
            $table->dateTime('endDate')->nullable();
            $table->longText('description')->nullable();
            $table->enum('type', ['crm', 'project']);
            $table->string('status')->default("true");
            $table->timestamps();

            // Foreign key constraints and relation
            $table->foreign('priorityId')->references('id')->on('priority');
            $table->foreign('taskStatusId')->references('id')->on('taskStatus');
            $table->foreign('projectId')->references('id')->on('project');
            $table->foreign('assigneeId')->references('id')->on('users');
            $table->foreign('milestoneId')->references('id')->on('milestone');
            $table->foreign('teamId')->references('id')->on('projectTeam');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
