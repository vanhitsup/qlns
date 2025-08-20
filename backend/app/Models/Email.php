<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Email extends Model
{
    use HasFactory;

    protected $table = 'email';
    protected $primaryKey = 'id';

    protected $fillable = [
        'emailOwnerId',
        'senderEmail',
        'receiverEmail',
        'companyId',
        'contactId',
        'opportunityId',
        'quoteId',
        'subject',
        'body',
        'emailStatus',
        'emailType',
    ];


    public function cc(): HasMany
    {
        return $this->hasMany(Cc::class, 'emailId');
    }

    public function bcc(): HasMany
    {
        return $this->hasMany(Bcc::class, 'emailId');
    }

    public function attachment(): BelongsTo
    {
        return $this->belongsTo(Attachment::class, 'emailId');
    }

    public function emailOwner(): BelongsTo
    {
        return $this->belongsTo(Users::class, 'emailOwnerId');
    }
}
