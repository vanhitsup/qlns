<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StaffPositionSalary extends Model
{
    use HasFactory;

    protected $table = 'staffPositionSalaries';

    protected $fillable = [
        'userId',
        'positionTitle',
        'positionCode',
        'appointmentStartDate',
        'appointmentEndDate',
        'reappointmentDate',
        'positionAllocation',
        'concurrentPosition',
        'currentPartyPosition',
        'alternatePartyPosition',
        'workPosition',
        'mainAssignedJob',
        'specializedField',
        'longestJob',
        'positionSalary',
        'salaryLevel',
        'salaryCoefficient',
        'salaryStartDate',
        'salaryPercentage',
        'seniorityAllowance',
        'pctnvkDate',
        'positionAllowance',
        'additionalAllowance',
        'otherAllowance',
        'jobPosition',
        'jobCode',
        'salaryAmount',
        'salaryComment',
        'additionalIncome',
    ];

    protected $casts = [
        'appointmentStartDate' => 'date',
        'appointmentEndDate' => 'date',
        'reappointmentDate' => 'date',
        'salaryStartDate' => 'date',
        'pctnvkDate' => 'date',
    ];

    /**
     * Get the user that owns the position salary.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
