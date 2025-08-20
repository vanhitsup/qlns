<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobApplicationStatus extends Model
{
    use HasFactory;

    protected $table = 'jobApplicationStatus';
    protected $primaryKey = 'id';

    protected $fillable = [
        'applicationStatus'
    ];

    public function jobApplication(): HasMany
    {
        return $this->hasMany(JobApplication::class, "applicationStatusId");
    }
}
