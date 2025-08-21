<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StaffResume extends Model
{
    use HasFactory;

    protected $table = 'staffResumes';

    protected $fillable = [
        'userId',
        'fullNameBirth',
        'gender',
        'otherNames',
        'birthDate',
        'birthProvince',
        'birthDistrict',
        'birthWard',
        'hometownProvince',
        'hometownDistrict',
        'hometownWard',
        'permanentAddress',
        'nationality',
        'ethnicity',
        'religion',
        'personalId',
        'issueDate',
        'issuePlace',
        'bankAccountNumber',
        'bankName',
        'healthCertificate',
        'resume',
        'height',
        'weight',
        'stateTitle',
        'familyBackground',
        'previousOccupation',
        'joinPartyDate',
        'joinOrganizationDate',
        'joinArmyDate',
        'leaveArmyDate',
        'highestRank',
        'policyObject',
        'educationLevelGeneral',
        'workHistory',
        'workUnit',
        'positionTitle',
        'firstRecruitmentDate',
        'currentAgencyJoinDate',
        'arrestHistory',
        'organizationRelations',
        'familyRelations',
        'familyEconomy',
        'leaveDate',
        'retirementDate',
        'staffCode',
        'bloodGroup',
    ];

    protected $casts = [
        'birthDate' => 'date',
        'issueDate' => 'date',
        'joinPartyDate' => 'date',
        'joinOrganizationDate' => 'date',
        'joinArmyDate' => 'date',
        'leaveArmyDate' => 'date',
        'firstRecruitmentDate' => 'date',
        'currentAgencyJoinDate' => 'date',
        'leaveDate' => 'date',
        'retirementDate' => 'date',
        'height' => 'integer',
        'weight' => 'integer',
    ];

    /**
     * Get the user that owns the resume.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
