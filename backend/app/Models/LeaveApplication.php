<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LeaveApplication extends Model
{
    use HasFactory;

    // Define table name explicitly if not following Laravel's naming convention
    protected $table = 'leaveApplication'; 
    protected $primaryKey = 'id';
    
    // Fillable fields for mass assignment
    protected $fillable = [
        'userId',
        'leaveType',
        'leaveFrom',
        'leaveTo',
        'acceptLeaveFrom',
        'acceptLeaveTo',
        'acceptLeaveBy',
        'leaveDuration',
        'acceptedLeaveDuration',
        'reason',
        'reviewComment',
        'attachment',
        'status',
    ];

    // Define the relationship to the Users model
    public function user(): BelongsTo
    {
        return $this->belongsTo(Users::class, 'userId');
    }
}
