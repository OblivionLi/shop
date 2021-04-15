<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'brand_id',
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

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function sizes()
    {
        return $this->belongsToMany(Size::class, 'size_product')->withPivot(['size_quantity']);
    }

    public function colors()
    {
        return $this->belongsToMany(Color::class, 'color_product')->withPivot(['color_quantity']);
    }

    public function childCategories()
    {
        return $this->belongsToMany(ChildCategory::class, 'child_category_product');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function images() 
    {
        return $this->hasMany(ProductImages::class);
    } 

    public function reviews() {
        return $this->hasMany(Review::class);
    }

    public function scopeInfo($query)
    {
        return $query->with('brand', 'sizes', 'colors', 'childCategories', 'user', 'images', 'reviews');
    }
}
