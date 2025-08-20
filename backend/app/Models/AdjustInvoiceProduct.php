<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AdjustInvoiceProduct extends Model
{
    use HasFactory;
    protected $table = 'adjustInvoiceProduct';
    protected $primaryKey = 'id';
    protected $fillable = [
        'adjustQuantity',
        'adjustInvoiceId',
        'productId',
    ];

    public function adjustInvoice(): BelongsTo
    {
        return $this->belongsTo(AdjustInvoice::class, 'adjustInvoiceId');
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'productId');
    }
}
