<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobWorkExperience extends Model
{
    use HasFactory;

    protected $table = 'jobWorkExperience';
    protected $primaryKey = 'id';
    protected $fillable = [
        'workExperience',
    ];
}
