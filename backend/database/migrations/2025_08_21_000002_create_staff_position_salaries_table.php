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
        Schema::create('staffPositionSalaries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('userId')->constrained('users')->onDelete('cascade');
            
            // Thông tin chức danh
            $table->string('positionTitle')->nullable()->comment('Ngạch/chức danh');
            $table->string('positionCode')->nullable()->comment('Mã số (nếu có)');
            $table->date('appointmentStartDate')->nullable()->comment('Ngày được bổ nhiệm/ngày phê chuẩn');
            $table->date('appointmentEndDate')->nullable()->comment('Thời hạn bổ nhiệm');
            $table->date('reappointmentDate')->nullable()->comment('Ngày được bổ nhiệm lại/phê chuẩn nhiệm kỳ tiếp theo');
            $table->string('positionAllocation')->nullable()->comment('Được quy hoạnh chức danh');
            
            // Chức vụ
            $table->string('concurrentPosition')->nullable()->comment('Chức vụ, chức vụ kiêm nhiệm');
            $table->string('currentPartyPosition')->nullable()->comment('Chức vụ Đảng hiện tại');
            $table->string('alternatePartyPosition')->nullable()->comment('Chức vụ Đảng kiêm nhiệm');
            $table->string('workPosition')->nullable()->comment('Vị trí công tác');
            
            // Công việc
            $table->text('mainAssignedJob')->nullable()->comment('Công việc chính được giao');
            $table->string('specializedField')->nullable()->comment('Sở trường công tác');
            $table->string('longestJob')->nullable()->comment('Công việc làm lâu nhất');
            
            // Thông tin lương
            $table->string('positionSalary')->nullable()->comment('Lương vị trí');
            $table->string('salaryLevel')->nullable()->comment('Bậc lương');
            $table->string('salaryCoefficient')->nullable()->comment('Hệ số lương');
            $table->date('salaryStartDate')->nullable()->comment('Ngày hưởng lương');
            $table->string('salaryPercentage')->nullable()->comment('Phần trăm hưởng (%)');
            
            // Phụ cấp
            $table->string('seniorityAllowance')->nullable()->comment('Phụ cấp thâm niên vượt khung(%)');
            $table->date('pctnvkDate')->nullable()->comment('Ngày hưởng PCTNVK');
            $table->string('positionAllowance')->nullable()->comment('Phụ cấp chức vụ');
            $table->string('additionalAllowance')->nullable()->comment('Phụ cấp kiêm nhiệm');
            $table->string('otherAllowance')->nullable()->comment('Phụ cấp khác');
            
            // Vị trí việc làm
            $table->string('jobPosition')->nullable()->comment('Vị trí việc làm');
            $table->string('jobCode')->nullable()->comment('Mã số');
            $table->string('salaryAmount')->nullable()->comment('Lương theo mức tiền(VNĐ)');
            $table->text('salaryComment')->nullable()->comment('Ghi chú về mức lương');
            $table->string('additionalIncome')->nullable()->comment('Thu nhập tăng thêm');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staff_position_salaries');
    }
};
