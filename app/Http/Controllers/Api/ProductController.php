<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::all();

        return ProductResource::collection($products);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductRequest $request)
    {
        $product = new Product();

        $product->name = $request->name;
        $product->product_code = $request->product_code;
        $product->price = $request->price;
        $product->discount = $request->has('discount') ? $request->discount : null;
        $product->description = $request->description;
        $product->material_description = $request->material_description;
        $product->rating = $request->has('rating') ? $request->rating : null;
        $product->total_reviews = $request->has('total_reviews') ? $request->total_reviews : null;
        $product->type = $request->type;
        $product->total_quantities = $request->total_quantities;

        $product->save();

        return response()->json(['success' => 'Product created succesfully!']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Product::find($id);

        return response()->json($product);
        // return ProductResource::collection($product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(StoreProductRequest $request, $id)
    {
        $product = Product::find($id);

        $product->name = $request->name;
        $product->product_code = $request->product_code;
        $product->price = $request->price;
        $product->discount = $request->has('discount') ? $request->discount : null;
        $product->description = $request->description;
        $product->material_description = $request->material_description;
        $product->rating = $request->has('rating') ? $request->rating : null;
        $product->total_reviews = $request->has('total_reviews') ? $request->total_reviews : null;
        $product->type = $request->type;
        $product->total_quantities = $request->total_quantities;

        $product->save();

        return response()->json(['success' => 'Product updated succesfully!']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::find($id);

        $product->delete();

        return response()->json(['success' => 'Product deleted succesfully!']);
    }
}
