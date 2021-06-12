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
        return $this->hasMany(ChildCategory::class);
    }

    public function type()
    {
        return $this->belongsTo(Type::class, 'type_id');
    }

    public function scopeInfo($query)
    {
        return $query->with('childCats', 'type', 'products');
    }
}
