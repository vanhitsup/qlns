<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SkillsByJob extends Model
{
    use HasFactory;

    protected $table = 'skillsByJob';
    protected $primaryKey = 'id';
    protected $fillable = [
        'jobId',
        'jobSkillId'
    ];

    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class, 'jobId');
    }

    public function jobSkills(): BelongsTo
    {
        return $this->belongsTo(JobSkills::class, 'jobSkillId');
    }
}
