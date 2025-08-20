<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Job extends Model
{
    use HasFactory;

    protected $table = 'job';
    protected $primaryKey = 'id';
    protected $fillable = [
        'companyId',
        'jobTitle',
        'jobDescription',
        'jobRequirement',
        'jobLocationId',
        'jobCategoryId',
        'totalPosition',
        'startTime',
        'endTime',
        'jobTypeId',
        'jobWorkExperienceId',
        'jobPayBy',
        'startingSalary',
        'maximumSalary',
        'exactSalary',
        'jobPaySystem',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(AppSetting::class, 'companyId');
    }

    public function jobCategory(): BelongsTo
    {
        return $this->belongsTo(JobCategory::class, 'jobCategoryId');
    }

    public function jobLocation(): BelongsTo
    {
        return $this->belongsTo(JobLocation::class, 'jobLocationId');
    }

    public function jobType(): BelongsTo
    {
        return $this->belongsTo(JobType::class, 'jobTypeId');
    }

    public function jobWorkExperience(): BelongsTo
    {
        return $this->belongsTo(JobWorkExperience::class, 'jobWorkExperienceId');
    }

    public function jobSkills(): HasMany
    {
        return $this->hasMany(SkillsByJob::class, 'jobId');
    }
}
