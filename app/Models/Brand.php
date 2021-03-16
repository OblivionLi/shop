<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'brand_name',
        'brand_quantity'
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
