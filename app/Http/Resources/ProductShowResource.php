<?php

namespace App\Http\Resources;

use App\Models\Review;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductShowResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'product_code' => $this->product_code,
            'price' => $this->price,
            'discount' => $this->discount,
            'description' => $this->description,
            'material_description' => $this->material_description,
            'rating' => $this->rating,
            'total_reviews' => $this->total_reviews,
            'total_quantities' => $this->total_quantities,
            'brand' => $this->brand,
            'sizes' => $this->sizes,
            'colors' => $this->colors,
            'child_categories' => $this->childCategories,
            'parent_categories' => $this->parentCategories,
            'types' => $this->types,
            'user' => $this->user,
            'images' => $this->images,
            'reviews' => $this->reviews,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
        
        
    }
}
