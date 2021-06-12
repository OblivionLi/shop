<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    use HasFactory;

    protected $fillable = [
        'id', 'name'
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }

    public function parentCats()
    {
        return $this->hasMany(ParentCategory::class);
    }
}
