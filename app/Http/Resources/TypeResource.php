<?php

namespace App\Http\Resources;

use App\Models\ParentCategory;
use App\Models\Type;
use Illuminate\Http\Resources\Json\JsonResource;

class TypeResource extends JsonResource
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
            'parentCats' => $this->parentCats,
            'childCats' => Type::with('parentCats.childCats')->find($this->id),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
