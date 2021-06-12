<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChildCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'child_category_name'
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }

    public function parentCat()
    {
        return $this->belongsTo(ParentCategory::class, 'parent_category_id');
    }

    public function scopeInfo($query)
    {
        return $query->with('products', 'parentCat', 'parentCat.type');
    }
}
