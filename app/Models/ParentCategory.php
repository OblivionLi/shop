<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParentCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'parent_category_name',
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }

    public function childCats()
    {
        return $this->belongsToMany(ChildCategory::class, 'child_category_parent_category');
    }

    public function types()
    {
        return $this->belongsToMany(Type::class, 'type_parent_category');
    }

    public function scopeInfo($query)
    {
        return $query->with('childCats', 'types', 'products');
    }
}
