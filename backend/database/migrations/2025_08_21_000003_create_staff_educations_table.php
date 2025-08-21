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
        Schema::create('staffEducations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('userId')->constrained('users')->onDelete('cascade');
            
            // Thông tin học hàm và bằng cấp
            $table->string('academicTitle')->nullable()->comment('Học hàm');
            $table->string('degree')->nullable()->comment('Bằng tốt nghiệp');
            $table->string('issuingOrganization')->nullable()->comment('Cơ quan, tổ chức cấp');
            $table->string('educationLevel')->nullable()->comment('Trình độ học vấn');
            $table->string('attachedFile')->nullable()->comment('Hồ sơ đính kèm (import)');
            
            // Lý luận chính trị
            $table->string('politicalTheory')->nullable()->comment('Lí luận chính trị');
            
            // Chuyên môn
            $table->string('specialized')->nullable()->comment('Chuyên môn (Từ trung cấp trở lên)');
            $table->string('trainingInstitution')->nullable()->comment('Tên cơ sở đào tạo');
            $table->string('trainingSpecialization')->nullable()->comment('Chuyên ngành đào tạo');
            $table->string('trainingForm')->nullable()->comment('Hình thức đào tạo');
            $table->string('educationDegree')->nullable()->comment('Văn bằng trình độ');
            $table->date('educationStartDate')->nullable()->comment('Ngày bắt đầu');
            $table->date('educationEndDate')->nullable()->comment('Ngày kết thúc');
            
            // Bồi dưỡng quản lý nhà nước
            $table->string('trainingContent')->nullable()->comment('Bồi dưỡng quản lý nhà nước/chức danh nghề nghiệp/nghiệp vụ chuyên ngành');
            $table->string('managementTrainingInstitution')->nullable()->comment('Tên cơ sở đào tạo');
            $table->date('managementTrainingStartDate')->nullable()->comment('Ngày bắt đầu');
            $table->date('managementTrainingEndDate')->nullable()->comment('Ngày kết thúc');
            
            // Bồi dưỡng kiến thức an ninh, quốc phòng
            $table->string('securityDefenseTraining')->nullable()->comment('Bồi dưỡng kiến thức an ninh, quốc phòng');
            $table->string('securityDefenseInstitution')->nullable()->comment('Tên cơ sở đào tạo');
            $table->string('securityDefenseCertificate')->nullable()->comment('Bằng/chứng chỉ được cấp');
            $table->date('securityDefenseStartDate')->nullable()->comment('Ngày bắt đầu');
            $table->date('securityDefenseEndDate')->nullable()->comment('Ngày kết thúc');
            
            // Tin học
            $table->string('itSkills')->nullable()->comment('Tin học');
            $table->string('itTrainingInstitution')->nullable()->comment('Tên cơ sở đào tạo');
            $table->string('itCertificate')->nullable()->comment('Bằng/chứng chỉ được cấp');
            $table->date('itTrainingStartDate')->nullable()->comment('Ngày bắt đầu');
            $table->date('itTrainingEndDate')->nullable()->comment('Ngày kết thúc');
            
            // Ngoại ngữ/tiếng dân tộc
            $table->string('foreignLanguage')->nullable()->comment('Ngoại ngữ/tiếng dân tộc');
            $table->string('languageTrainingInstitution')->nullable()->comment('Tên cơ sở đào tạo');
            $table->string('languageCertificate')->nullable()->comment('Bằng/chứng chỉ được cấp');
            $table->date('languageTrainingStartDate')->nullable()->comment('Ngày bắt đầu');
            $table->date('languageTrainingEndDate')->nullable()->comment('Ngày kết thúc');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staff_educations');
    }
};
