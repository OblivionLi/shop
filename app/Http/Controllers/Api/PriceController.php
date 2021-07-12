<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\PriceService;
use Illuminate\Http\Request;

class PriceController extends Controller
{
    public function index(PriceService $priceService)
    {
        $prices = $priceService->getPrices(
            request()->input('prices', []),
            request()->input('brands', []),
            request()->input('sizes', []),
            request()->input('colors', []),
        );

        return response()->json($prices);
    }
}
