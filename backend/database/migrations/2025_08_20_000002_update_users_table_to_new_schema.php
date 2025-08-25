<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Adjust column definitions using raw SQL to avoid doctrine/dbal
        // Note: assumes MySQL. Adjust SQL if using a different driver.
        if (Schema::hasColumn('users', 'firstName')) {
            DB::statement("ALTER TABLE `users` MODIFY `firstName` VARCHAR(100) NULL");
        }
        if (Schema::hasColumn('users', 'lastName')) {
            DB::statement("ALTER TABLE `users` MODIFY `lastName` VARCHAR(100) NULL");
        }
        if (Schema::hasColumn('users', 'username')) {
            DB::statement("ALTER TABLE `users` MODIFY `username` VARCHAR(50) NULL");
        }
        if (Schema::hasColumn('users', 'email')) {
            DB::statement("ALTER TABLE `users` MODIFY `email` VARCHAR(150) NULL");
        }
        if (Schema::hasColumn('users', 'phone')) {
            DB::statement("ALTER TABLE `users` MODIFY `phone` VARCHAR(15) NULL");
        }

        // Ensure roleId/departmentId columns are nullable and correct type before FKs
        if (Schema::hasColumn('users', 'roleId')) {
            DB::statement("ALTER TABLE `users` MODIFY `roleId` BIGINT UNSIGNED NULL");
        }
        if (Schema::hasColumn('users', 'departmentId')) {
            DB::statement("ALTER TABLE `users` MODIFY `departmentId` BIGINT UNSIGNED NULL");
        }

        // Drop existing foreign keys for roleId and departmentId if they exist (regardless of name)
        foreach (['roleId', 'departmentId'] as $col) {
            if (Schema::hasColumn('users', $col)) {
                $constraints = DB::select(
                    "SELECT CONSTRAINT_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = ? AND REFERENCED_TABLE_NAME IS NOT NULL",
                    [$col]
                );
                foreach ($constraints as $constraint) {
                    $name = $constraint->CONSTRAINT_NAME;
                    DB::statement("ALTER TABLE `users` DROP FOREIGN KEY `{$name}`");
                }
            }
        }

        // Modify or add status column as enum
        if (Schema::hasColumn('users', 'status')) {
            DB::statement("ALTER TABLE `users` MODIFY `status` ENUM('active','inactive','suspended') NOT NULL DEFAULT 'active'");
        }

        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'nationalId')) {
                $table->string('nationalId', 20)->unique()->nullable()->comment('Số CCCD')->after('password');
            }

            // Drop FKs for columns to be removed
            foreach (['employmentStatusId','shiftId','leavePolicyId','weeklyHolidayId'] as $fkCol) {
                if (Schema::hasColumn('users', $fkCol)) {
                    try { $table->dropForeign([$fkCol]); } catch (\Throwable $e) {}
                }
            }

            // Remove deprecated columns if present
            foreach ([
                'refreshToken','employeeId','street','city','state','zipCode','country','bloodGroup','image',
                'commissionType','commissionValue','employmentStatusId','shiftId','leaveDate','leavePolicyId','weeklyHolidayId','isLogin','salaryMode'
            ] as $col) {
                if (Schema::hasColumn('users', $col)) {
                    $table->dropColumn($col);
                }
            }

            // If status column does not exist, add it now
            if (!Schema::hasColumn('users', 'status')) {
                $table->enum('status', ['active', 'inactive', 'suspended'])->default('active')->after('departmentId');
            }

            // Indexes: keep only the composite and status, unique indexes exist for username/email/nationalId
            $table->index(['firstName', 'lastName'], 'idx_employee_name');
        });

        // Create status index if not exists
        $statusIndex = DB::select("SELECT 1 FROM INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME='users' AND INDEX_NAME='users_status_index' LIMIT 1");
        if (empty($statusIndex)) {
            DB::statement("ALTER TABLE `users` ADD INDEX `users_status_index` (`status`)");
        }
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            try { $table->dropIndex('idx_employee_name'); } catch (\Throwable $e) {}
            try { $table->dropIndex('users_status_index'); } catch (\Throwable $e) {}
        });
        // Note: Column type/nullable changes are not reverted here.
    }
};
