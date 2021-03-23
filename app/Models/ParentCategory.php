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

    public function childCats()
    {
        return $this->belongsToMany(ChildCategory::class, 'child_category_parent_category');
    }
}
