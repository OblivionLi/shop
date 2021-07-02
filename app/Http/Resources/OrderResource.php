<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            'status' => $this->status,
            'products_price' => $this->products_price,
            'products_discount_price' => $this->products_discount_price,
            'shipping_price' => $this->shipping_price,
            'tax_price' => $this->tax_price,
            'total_price' => $this->total_price,
            'is_paid' => $this->is_paid,
            'is_delivered' => $this->is_delivered,
            'delivered_at' => $this->delivered_at,
            'paid_at' => $this->paid_at,
            'products' => $this->products,
            'user' => $this->user,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
