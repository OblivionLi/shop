<?php

namespace App\Http\Resources;

use App\Models\Product;
use App\Models\Type;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'type' => $this->types,
            'total_quantities' => $this->total_quantities,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'brand' => $this->brand,
            'sizes' => $this->sizes,
            'colors' => $this->colors,
            'childCategories' => $this->childCategories,
            'parentCategories' => $this->parentCategories,
            'user' => $this->user,
            'images' => $this->images,
            'reviews' => $this->reviews
        ];
    }
}
