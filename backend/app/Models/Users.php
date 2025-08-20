<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
}
