<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Images extends Model
{
    use HasFactory;

    protected $table = 'images';
    protected $primaryKey = 'id';
    protected $fillable = [
        'productGroupId',
        'reviewId',
        'ticketId',
        'ticketCommentId',
        'imageName',
    ];

    public function productGroup(): BelongsTo
    {
        return $this->belongsTo(ProductVariant::class, 'id');
    }

    public function review():BelongsTo
    {
        return $this->belongsTo(ReviewRating::class, 'reviewId');
    }

    public function ticket():BelongsTo
    {
        return $this->belongsTo(Ticket::class, 'ticketId');
    }

    public function ticketComment():BelongsTo
    {
        return $this->belongsTo(TicketComment::class, 'ticketCommentId');
    }

}
