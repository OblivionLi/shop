<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'status', 'products_price', 'products_discount_price', 'shipping_price', 'tax_price', 'total_price', 'is_paid', 'is_delivered', 'paid_at', 'delivered_at'
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_product')->withPivot('qty');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function scopeInfo($query)
    {
        return $query->with('products', 'products.brand', 'products.sizes', 'products.colors', 'user', 'user.addresses');
    }
}
