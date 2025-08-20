<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Attendance extends Model
{
    use HasFactory;

    protected $table = 'attendance';
    protected $primaryKey = 'id';
    protected $fillable = [
        'userId',
        'inTime',
        'date',
        'outTime',
        'ip',
        'comment',
        'punchBy',
        'totalHour',
        'inTimeStatus',
        'outTimeStatus',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(Users::class, 'userId');
    }
    public function users(): HasMany
    {
        return $this->hasMany(Users::class, 'userId');
    }
}
