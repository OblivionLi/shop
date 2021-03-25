<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChildCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'child_category_name',
        'child_category_quantity'
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }

    public function parentCats()
    {
        return $this->belongsToMany(ParentCategory::class, 'child_category_parent_category');
    }

    public function scopeInfo($query)
    {
        return $query->with('products', 'parentCats');
    }
}
