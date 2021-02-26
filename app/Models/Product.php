<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'product_code',
        'price',
        'discount',
        'description',
        'material_description',
        'rating',
        'total_reviews',
        'type',
        'total_quantities'
    ];
}
