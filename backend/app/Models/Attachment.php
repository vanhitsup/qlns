<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Attachment extends Model
{
    use HasFactory;

    protected $table = 'attachment';
    protected $primaryKey = 'id';

    protected $fillable = [
        'attachmentOwnerId',
        'companyId',
        'contactId',
        'opportunityId',
        'attachmentPath',
        'attachmentName',
    ];

 

    public function attachmentOwner(): BelongsTo
    {
        return $this->belongsTo(Users::class, 'attachmentOwnerId');
    }

    public function email(): HasMany
    {
        return $this->hasMany(Email::class, 'emailId');
    }

}

