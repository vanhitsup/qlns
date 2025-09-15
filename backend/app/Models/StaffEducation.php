<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StaffEducation extends Model
{
    use HasFactory;

    protected $table = 'staffEducations';

    protected $fillable = [
        'userId',
        'academicTitle',
        'degree',
        'issuingOrganization',
        'educationLevel',
        'attachedFile',
        'politicalTheory',
        'specialized',
        'trainingInstitution',
        'trainingSpecialization',
        'trainingForm',
        'educationDegree',
        'educationStartDate',
        'educationEndDate',
        'trainingContent',
        'managementTrainingInstitution',
        'managementTrainingStartDate',
        'managementTrainingEndDate',
        'securityDefenseTraining',
        'securityDefenseInstitution',
        'securityDefenseCertificate',
        'securityDefenseStartDate',
        'securityDefenseEndDate',
        'itSkills',
        'itTrainingInstitution',
        'itCertificate',
        'itTrainingStartDate',
        'itTrainingEndDate',
        'foreignLanguage',
        'languageTrainingInstitution',
        'languageCertificate',
        'languageTrainingStartDate',
        'languageTrainingEndDate',
    ];

    protected $casts = [
        'educationStartDate' => 'date',
        'educationEndDate' => 'date',
        'managementTrainingStartDate' => 'date',
        'managementTrainingEndDate' => 'date',
        'securityDefenseStartDate' => 'date',
        'securityDefenseEndDate' => 'date',
        'itTrainingStartDate' => 'date',
        'itTrainingEndDate' => 'date',
        'languageTrainingStartDate' => 'date',
        'languageTrainingEndDate' => 'date',
        // allow multiple files
        'attachedFile' => 'array',
        'securityDefenseCertificate' => 'array',
        'itCertificate' => 'array',
        'languageCertificate' => 'array',
    ];

    /**
     * Get the user that owns the education.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
