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
        Schema::table('jobApplication', function (Blueprint $table) {
            $table->unsignedBigInteger('applicationStatusId')->nullable();

            $table->foreign('applicationStatusId')->references('id')->on('jobApplicationStatus');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jobApplication', function (Blueprint $table) {
            $table->dropColumn('applicationStatusId');
        });
    }
};
