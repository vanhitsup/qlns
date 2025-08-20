<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use League\CommonMark\Reference\Reference;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('jobApplication', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('jobId');
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->string('address')->nullable();
            $table->string('cv');
            $table->text('coverLater')->nullable();
            $table->string('status')->default('true');
            $table->timestamps();

            // foreign key relation constraint
            $table->foreign('jobId')->references('id')->on('job');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobApplication');
    }
};
