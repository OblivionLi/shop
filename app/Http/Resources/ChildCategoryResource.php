<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ChildCategoryResource extends JsonResource
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
            'child_category_name' => $this->child_category_name,
            'child_category_quantity' => $this->child_category_quantity,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'products' => $this->products
        ];
    }
}
