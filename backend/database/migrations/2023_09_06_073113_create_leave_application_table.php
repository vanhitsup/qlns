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
        Schema::create('leaveApplication', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('userId');
            $table->string('leaveType');
            $table->dateTime('leaveFrom');
            $table->dateTime('leaveTo');
            $table->dateTime('acceptLeaveFrom')->nullable();
            $table->dateTime('acceptLeaveTo')->nullable();
            $table->integer('acceptLeaveBy')->nullable();
            $table->integer('leaveDuration')->nullable();
            $table->string('acceptedLeaveDuration')->nullable();
            $table->longText('reason')->nullable();
            $table->string('reviewComment')->nullable();
            $table->string('attachment')->nullable();
            $table->enum('status', ['ACCEPTED','REJECTED','PENDING'])->default('PENDING');
            $table->timestamps();

            // relation foreign key constraints
            $table->foreign('userId')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leaveApplication');
    }
};
