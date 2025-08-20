<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobCategory extends Model
{
    use HasFactory;

    protected $table = 'jobCategory';
    protected $primaryKey = 'id';
    protected $fillable = [
        'jobCategoryName'
    ];
}
