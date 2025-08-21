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
        Schema::create('staffResumes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('userId')->constrained('users')->onDelete('cascade');
            
            // Thông tin cá nhân
            $table->string('fullNameBirth')->nullable()->comment('Họ và tên khai sinh (in hoa)');
            $table->enum('gender', ['Nam', 'Nữ'])->nullable()->comment('Giới tính');
            $table->string('otherNames')->nullable()->comment('Các tên gọi khác');
            $table->date('birthDate')->nullable()->comment('Ngày sinh');
            
            // Nơi sinh
            $table->string('birthProvince')->nullable()->comment('Tỉnh/TP nơi sinh');
            $table->string('birthDistrict')->nullable()->comment('Quận/Huyện nơi sinh');
            $table->string('birthWard')->nullable()->comment('Xã/Phường nơi sinh');
            
            // Quê quán
            $table->string('hometownProvince')->nullable()->comment('Tỉnh/TP quê quán');
            $table->string('hometownDistrict')->nullable()->comment('Quận/Huyện quê quán');
            $table->string('hometownWard')->nullable()->comment('Xã/Phường quê quán');
            
            $table->text('permanentAddress')->nullable()->comment('Địa chỉ thường trú');
            $table->string('nationality')->nullable()->comment('Quốc tịch');
            $table->string('ethnicity')->nullable()->comment('Dân tộc');
            $table->string('religion')->nullable()->comment('Tôn giáo');
            $table->string('personalId')->nullable()->comment('Số CCCD');
            $table->date('issueDate')->nullable()->comment('Ngày cấp CCCD');
            $table->string('issuePlace')->nullable()->comment('Nơi cấp CCCD');
            
            // Thông tin ngân hàng
            $table->string('bankAccountNumber')->nullable()->comment('Số TK ngân hàng');
            $table->string('bankName')->nullable()->comment('Ngân hàng');
            
            // Thông tin sức khỏe
            $table->string('healthCertificate')->nullable()->comment('Giấy khám sức khỏe');
            $table->string('resume')->nullable()->comment('Sơ yếu lý lịch');
            $table->integer('height')->nullable()->comment('Chiều cao (cm)');
            $table->integer('weight')->nullable()->comment('Cân nặng (kg)');
            
            // Thông tin khác
            $table->string('stateTitle')->nullable()->comment('Danh hiệu nhà nước phong');
            $table->string('familyBackground')->nullable()->comment('Thành phần gia đình xuất thân');
            $table->string('previousOccupation')->nullable()->comment('Nghề nghiệp trước đây');
            
            // Thông tin Đảng
            $table->date('joinPartyDate')->nullable()->comment('Ngày vào Đảng CSVN');
            $table->date('joinOrganizationDate')->nullable()->comment('Ngày tham gia tổ chức CT-XH');
            
            // Thông tin quân đội
            $table->date('joinArmyDate')->nullable()->comment('Ngày nhập ngũ');
            $table->date('leaveArmyDate')->nullable()->comment('Ngày xuất ngũ');
            $table->string('highestRank')->nullable()->comment('Quân hàm cao nhất');
            $table->string('policyObject')->nullable()->comment('Đối tượng chính sách');
            
            // Thông tin giáo dục và công tác
            $table->string('educationLevelGeneral')->nullable()->comment('Trình độ giáo dục phổ thông');
            $table->longText('workHistory')->nullable()->comment('Quá trình công tác');
            $table->string('workUnit')->nullable()->comment('Đơn vị công tác');
            $table->string('positionTitle')->nullable()->comment('Chức danh/chức vụ');
            $table->date('firstRecruitmentDate')->nullable()->comment('Ngày được tuyển dụng lần đầu');
            $table->date('currentAgencyJoinDate')->nullable()->comment('Ngày vào cơ quan hiện tại');
            
            // Thông tin khác
            $table->longText('arrestHistory')->nullable()->comment('Khai rõ: bị bắt, bị tù');
            $table->longText('organizationRelations')->nullable()->comment('Tham gia các tổ chức');
            $table->longText('familyRelations')->nullable()->comment('Mối quan hệ gia đình');
            $table->longText('familyEconomy')->nullable()->comment('Hoàn cảnh kinh tế gia đình');
            
            // Thông tin công việc
            $table->date('leaveDate')->nullable()->comment('Ngày nghỉ phép');
            $table->date('retirementDate')->nullable()->comment('Ngày nghỉ hưu');
            $table->string('staffCode')->nullable()->comment('Mã số nhân viên');
            $table->string('bloodGroup')->nullable()->comment('Nhóm máu');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staff_resumes');
    }
};
