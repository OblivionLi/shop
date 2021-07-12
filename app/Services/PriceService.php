<?php

namespace App\Services;

use App\Models\Product as ModelsProduct;

class PriceService
{
    private $prices;
    private $brands;
    private $sizes;
    private $colors;

    public function getPrices($prices, $brands, $sizes, $colors)
    {
        $this->prices = $prices;
        $this->brands = $brands;
        $this->sizes = $sizes;
        $this->colors = $colors;
        $formattedPrices = [];

        foreach(ModelsProduct::PRICES as $index => $name) {
            $formattedPrices[] = [
                'name' => $name,
                'products_count' => $this->getProductCount($index)
            ];
        }

        return $formattedPrices;
    }

    private function getProductCount($index)
    {
        return ModelsProduct::withFilters($this->prices, $this->brands, $this->sizes, $this->colors)
            ->when($index == 0, function ($query) {
                $query->where('price', '<', '50.00');
            })
            ->when($index == 1, function ($query) {
                $query->whereBetween('price', ['50.00', '100.00']);
            })
            ->when($index == 2, function ($query) {
                $query->whereBetween('price', ['100.00', '500.00']);
            })
            ->when($index == 3, function ($query) {
                $query->where('price', '>', '500.00');
            })
            ->count();
    }
}