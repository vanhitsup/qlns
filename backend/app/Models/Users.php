<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Users extends Model
{
    use HasFactory;

    //create user model
    protected $table = 'users';
    protected $primaryKey = 'id';
    protected $hidden = ['password'];
    protected $fillable = [
        'firstName',
        'lastName',
        'username',
        'email',
        'password',
        'nationalId',
        'phone',
        'roleId',
        'departmentId',
        'status',
    ];

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class, 'roleId');
    }

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class, 'departmentId');
    }

    /**
     * Get the staff resume for the user.
     */
    public function staffResume(): HasOne
    {
        return $this->hasOne(StaffResume::class);
    }

    /**
     * Get the staff position salary for the user.
     */
    public function staffPositionSalary(): HasOne
    {
        return $this->hasOne(StaffPositionSalary::class);
    }

    /**
     * Get the staff education for the user.
     */
    public function staffEducation(): HasOne
    {
        return $this->hasOne(StaffEducation::class);
    }
}
