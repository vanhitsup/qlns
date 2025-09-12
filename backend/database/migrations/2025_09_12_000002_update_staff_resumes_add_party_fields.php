<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('staffResumes', function (Blueprint $table) {
            $table->string('partyCardNumber')->nullable()->after('joinPartyDate');
            $table->date('joinPartyDateOficial')->nullable()->after('partyCardNumber');
            $table->string('partyPosition')->nullable()->after('joinPartyDateOficial');
            $table->date('leavePartyDate')->nullable()->after('partyPosition');
            $table->date('birthDateParty')->nullable()->after('leavePartyDate');
            $table->string('partyCell')->nullable()->after('birthDateParty');
            $table->date('joinPartyDate2nd')->nullable()->after('partyCell');
        });
    }

    public function down(): void
    {
        Schema::table('staffResumes', function (Blueprint $table) {
            if (Schema::hasColumn('staffResumes', 'partyCardNumber')) {
                $table->dropColumn('partyCardNumber');
            }
            if (Schema::hasColumn('staffResumes', 'joinPartyDateOficial')) {
                $table->dropColumn('joinPartyDateOficial');
            }
            if (Schema::hasColumn('staffResumes', 'partyPosition')) {
                $table->dropColumn('partyPosition');
            }
            if (Schema::hasColumn('staffResumes', 'leavePartyDate')) {
                $table->dropColumn('leavePartyDate');
            }
            if (Schema::hasColumn('staffResumes', 'birthDateParty')) {
                $table->dropColumn('birthDateParty');
            }
            if (Schema::hasColumn('staffResumes', 'partyCell')) {
                $table->dropColumn('partyCell');
            }
            if (Schema::hasColumn('staffResumes', 'joinPartyDate2nd')) {
                $table->dropColumn('joinPartyDate2nd');
            }
        });
    }
};


