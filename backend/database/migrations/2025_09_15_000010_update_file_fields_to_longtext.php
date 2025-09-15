<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Use raw SQL to avoid doctrine/dbal dependency for column type changes
        DB::statement("ALTER TABLE `users` MODIFY COLUMN `nationalIdImage` LONGTEXT NULL");
        DB::statement("ALTER TABLE `staffResumes` MODIFY COLUMN `healthCertificate` LONGTEXT NULL");
        DB::statement("ALTER TABLE `staffResumes` MODIFY COLUMN `resume` LONGTEXT NULL");
        DB::statement("ALTER TABLE `staffEducations` MODIFY COLUMN `attachedFile` LONGTEXT NULL");
        DB::statement("ALTER TABLE `staffEducations` MODIFY COLUMN `securityDefenseCertificate` LONGTEXT NULL");
        DB::statement("ALTER TABLE `staffEducations` MODIFY COLUMN `itCertificate` LONGTEXT NULL");
        DB::statement("ALTER TABLE `staffEducations` MODIFY COLUMN `languageCertificate` LONGTEXT NULL");
    }

    public function down(): void
    {
        // Revert to VARCHAR(255); adjust if original sizes differ
        DB::statement("ALTER TABLE `users` MODIFY COLUMN `nationalIdImage` VARCHAR(255) NULL");
        DB::statement("ALTER TABLE `staffResumes` MODIFY COLUMN `healthCertificate` VARCHAR(255) NULL");
        DB::statement("ALTER TABLE `staffResumes` MODIFY COLUMN `resume` VARCHAR(255) NULL");
        DB::statement("ALTER TABLE `staffEducations` MODIFY COLUMN `attachedFile` VARCHAR(255) NULL");
        DB::statement("ALTER TABLE `staffEducations` MODIFY COLUMN `securityDefenseCertificate` VARCHAR(255) NULL");
        DB::statement("ALTER TABLE `staffEducations` MODIFY COLUMN `itCertificate` VARCHAR(255) NULL");
        DB::statement("ALTER TABLE `staffEducations` MODIFY COLUMN `languageCertificate` VARCHAR(255) NULL");
    }
};


