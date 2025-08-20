<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobType extends Model
{
    use HasFactory;

    protected $table = 'jobType';
    protected $primaryKey = 'id';
    protected $fillable = [
        'jobTypeName',
    ];
}
