<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobSkills extends Model
{
    use HasFactory;

    protected $table = 'jobSkills';
    protected $primaryKey = 'id';
    protected $fillable = [
        'jobCategoryId',
        'jobSkillName'
    ];

    // make relation with jobCategory table
    public function jobCategory(): BelongsTo
    {
        return $this->belongsTo(JobCategory::class, 'jobCategoryId');
    }
}
