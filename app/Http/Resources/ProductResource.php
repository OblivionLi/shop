<?php

namespace App\Http\Resources;

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
            'name' => $this->name,
            'product_code' => $this->product_code,
            'price' => $this->price,
            'discount' => $this->discount,
            'description' => $this->description,
            'material_description' => $this->material_description,
            'rating' => $this->rating,
            'total_reviews' => $this->total_reviews,
            'type' => $this->type,
            'total_quantities' => $this->total_quantities,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

        ];
    }
}
