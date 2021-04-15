<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Review;
use Error;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function save(Request $request) {
        $product_id = $request->id;
        $user_id = $request->user_id;
        $loggedUser = Auth::id();

        $product = Product::find($product_id);

        if ($product) {
            $existingReview = Review::where('user_id', $loggedUser)->get();
            if ($existingReview->count() < 1) {
                $review = new Review();

                $review->product_id = $product_id;
                $review->user_id = $user_id;
                $review->name = $request->user_name;
                $review->rating = $request->rating;
                $review->comment = $request->comment;
        
                $review->save();

                $reviews = Review::where('product_id', $product_id)->get();

                $product->total_reviews = $reviews->count();
                $product->rating = $product->reviews->avg('rating');

                $product->save();
            } else {
                throw new Error('Product already reviewed', 1);
            }
        }

        $response = [
            'message' => 'Review created successfully'
        ];

        return response()->json($response, 200);
    }
}
