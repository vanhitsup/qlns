<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('fullName')->nullable()->after('lastName');
            $table->string('nationalIdImage')->nullable()->after('nationalId');
            $table->text('note')->nullable()->after('status');
            $table->string('firstName')->nullable()->change();
            $table->string('lastName')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'fullName')) {
                $table->dropColumn('fullName');
            }
            if (Schema::hasColumn('users', 'nationalIdImage')) {
                $table->dropColumn('nationalIdImage');
            }
            if (Schema::hasColumn('users', 'note')) {
                $table->dropColumn('note');
            }
        });
    }
};


