<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class WeeklyHoliday extends Model
{
    use HasFactory;

    protected $table = 'weeklyHoliday';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
        'startDay',
        'endDay',
    ];

    public function user(): HasMany
    {
        return $this->hasMany(Users::class, 'weeklyHolidayId');
    }
}
