<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BrandResource extends JsonResource
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
            'brand_name' => $this->brand_name,
            'brand_quantity' => $this->brand_quantity,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'products' => $this->products
        ];
    }
}
