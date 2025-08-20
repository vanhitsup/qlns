<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payslip extends Model
{
    use HasFactory;

    protected $table = 'payslip';
    protected $primaryKey = 'id';
    protected $fillable = [
        'userId',
        'salaryMonth',
        'salaryYear',
        'salary',
        'paidLeave',
        'unpaidLeave',
        'monthlyHoliday',
        'publicHoliday',
        'workDay',
        'shiftWiseWorkHour',
        'monthlyWorkHour',
        'hourlySalary',
        'workingHour',
        'salaryPayable',
        'bonus',
        'bonusComment',
        'deduction',
        'deductionComment',
        'totalPayable',
        'paymentStatus',
        'totalDueAmount',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(Users::class, 'userId');
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'relatedId');
    }
}
