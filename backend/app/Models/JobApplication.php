<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobApplication extends Model
{
    use HasFactory;

    protected $table = 'jobApplication';
    protected $primaryKey = 'id';
    protected $fillable = [
        'jobId',
        'name',
        'email',
        'phone',
        'address',
        'cv',
        'coverLater',
        'applicationStatusId',
    ];

    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class, 'jobId');
    }

    public function jobApplicationStatus(): BelongsTo
    {
        return $this->belongsTo(JobApplicationStatus::class, 'applicationStatusId');
    }
}
