<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LeavePolicy extends Model
{
    use HasFactory;

    protected $table = 'leavePolicy';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
        'paidLeaveCount',
        'unpaidLeaveCount',
    ];

    public function user(): HasMany
    {
        return $this->hasMany(Users::class, 'leavePolicyId');
    }
}
