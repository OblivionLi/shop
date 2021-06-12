<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Review;
use App\Models\User;
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
            $existingReview = Review::where([
                ['product_id', '=', $product_id],
                ['user_id', '=', $loggedUser]
            ])->get();

            if ($existingReview->count() < 1) {
                $review = new Review();

                $review->product_id = $product_id;
                // $review->user_id = $user_id->id;
                $review->user_id = $loggedUser;
                $review->name = $request->username;
                $review->rating = $request->rating;
                $review->comment = $request->comment;
        
                $review->save();

                $reviews = Review::where('product_id', $product_id)->get();

                $product->total_reviews = $reviews->count();
                $product->rating = $reviews->avg('rating');

                $product->save();
            } else {
                throw new Error('You reviewed this product already. Only one review per customer is allowed!', 1);
            }
        }

        $response = [
            'message' => 'Review created successfully.'
        ];

        return response()->json($response, 200);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reviews = Review::with('products', 'user')->get();

        return response()->json($reviews);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function reviewsPag($product_id)
    {
        $reviews = Review::with('products')->where('product_id', '=', $product_id)->paginate(8);

        return response()->json($reviews);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $review = Review::find($id);

        return response()->json($review);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $review = Review::find($id);

        $user_id = Auth::id();
        $user = User::find($user_id);

        $review->admin_name = $user->name;
        $review->comment = $request->comment;
        $review->admin_comment = $request->admin_comment;

        $review->save();

        return response()->json(['success' => 'Review updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $review = Review::find($id);

        $review->delete();

        return response()->json(['success' => 'Review deleted succesfully!']);
    }
}
