<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'id', 'name', 'surname', 'country', 'city', 'address', 'postal_code', 'phone_number'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
