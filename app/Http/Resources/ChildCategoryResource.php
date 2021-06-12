<?php

namespace App\Http\Resources;

use App\Models\ChildCategory;
use App\Models\ParentCategory;
use App\Models\Type;
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
            'name' => $this->child_category_name,
            'parentCat' => $this->parentCat,
            // 'parentCatType' => ParentCategory::with('types')->find($this->parentCats[0]->id),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            // 'products' => $this->products
        ];
    }
}
