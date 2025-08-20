<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobLocation extends Model
{
    use HasFactory;

    protected $table = 'jobLocation';
    protected $primaryKey = 'id';
    protected $fillable = [
        'countryName',
        'jobLocation'
    ];
}
