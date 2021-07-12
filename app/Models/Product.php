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
        return $this->belongsTo(Brand::class, 'brand_id');
    }

    public function sizes()
    {
        return $this->belongsToMany(Size::class, 'size_product')->withPivot('size_id', 'size_quantity');
    }

    public function colors()
    {
        return $this->belongsToMany(Color::class, 'color_product')->withPivot('color_id', 'color_quantity');
    }

    public function childCategories()
    {
        return $this->belongsToMany(ChildCategory::class, 'child_category_product')->withPivot('product_id', 'child_category_id');
    }

    public function parentCategories()
    {
        return $this->belongsToMany(ParentCategory::class, 'parent_category_product')->withPivot('product_id', 'parent_category_id');
    }

    public function types()
    {
        return $this->belongsToMany(Type::class, 'type_product')->withPivot('product_id', 'type_id');
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
        return $query->with('brand', 'sizes', 'colors', 'childCategories', 'childCategories.parentCat', 'parentCategories', 'parentCategories.type', 'types', 'user', 'images', 'reviews');
    }

    const PRICES = [
        'Less than 50',
        'From 50 to 100',
        'From 100 to 500',
        'More than 500',
    ];

    public function scopeWithFilters($query, $prices, $brands, $sizes, $colors)
    {
        return $query->when(count($brands), function ($query) use ($brands) {
                $query->whereIn('brand_id', $brands);
            })
            ->when(count($sizes), function ($query) use ($sizes) {
                $query->whereHas('sizes', function ($q) use ($sizes) {
                    $q->where('size_id', $sizes);
                });
            })
            ->when(count($colors), function ($query) use ($colors) {
                $query->whereHas('colors', function ($q) use ($colors) {
                    $q->where('color_id', $colors);
                });
            })
            ->when(count($prices), function ($query) use ($prices){
                $query->where(function ($query) use ($prices) {
                    $query->when(in_array(0, $prices), function ($query) {
                            $query->orWhere('price', '<', '50.00');
                        })
                        ->when(in_array(1, $prices), function ($query) {
                            $query->orWhereBetween('price', ['50.00', '100.00']);
                        })
                        ->when(in_array(2, $prices), function ($query) {
                            $query->orWhereBetween('price', ['100.00', '500.00']);
                        })
                        ->when(in_array(3, $prices), function ($query) {
                            $query->orWhere('price', '>', '500.00');
                        });
                });
            });
    }
}
