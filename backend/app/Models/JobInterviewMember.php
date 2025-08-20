<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobInterviewMember extends Model
{
    use HasFactory;

    protected $table = 'jobInterviewMember';
    protected $primaryKey = 'id';
    protected $fillable = [
        'jobInterviewId',
        'userId',
    ];

    public function jobInterview(): BelongsTo
    {
        return $this->belongsTo(JobInterview::class, 'jobInterviewId');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(Users::class, 'userId');
    }
}
