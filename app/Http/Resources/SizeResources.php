<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SizeResources extends JsonResource
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
            'size_name' => $this->size_name,
            'size_quantity' => $this->size_quantity,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'products' => $this->products
        ];
    }
}
