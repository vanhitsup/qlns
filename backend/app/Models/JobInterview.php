<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobInterview extends Model
{
    use HasFactory;

    protected $table = 'jobInterview';
    protected $primaryKey = 'id';
    protected $fillable = [
        'jobApplicationId',
        'scheduleDate',
        'scheduleTime',
        'comment',
        'interviewStatus',
    ];

    public function jobApplication(): BelongsTo
    {
        return $this->belongsTo(JobApplication::class, 'jobApplicationId');
    }

    public function jobInterviewMember(): HasMany
    {
        return $this->hasMany(JobInterviewMember::class, 'jobInterviewId');
    }
}
