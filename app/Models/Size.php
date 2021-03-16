<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    use HasFactory;

    protected $fillable = [
        'size_name',
        'size_quantity'
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'size_product');
    }
}
