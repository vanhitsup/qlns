<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('email', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('emailOwnerId')->nullable();
            $table->string('senderEmail');
            $table->string('receiverEmail');
            $table->string('subject')->nullable();
            //body can be html
            $table->longText('body')->nullable();
            $table->string('attachment')->nullable();
            $table->string('emailStatus')->nullable();
            $table->enum('emailType', ['global', 'crm', 'hrm'])->default('global');
            $table->string('status')->default("true");
            $table->timestamps();

            $table->foreign('emailOwnerId')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('email');
    }
};
