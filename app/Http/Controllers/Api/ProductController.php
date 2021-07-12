<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductShowResource;
use App\Http\Resources\PublicProductResource;
use App\Models\Brand;
use App\Models\ChildCategory;
use App\Models\Color;
use App\Models\ParentCategory;
use App\Models\Product;
use App\Models\ProductImages;
use App\Models\Review;
use App\Models\Size;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::info()->get();

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
        $user_id = Auth::id();
        
        $product = new Product();

        $product->brand()->associate($request->brandName);

        $product->user_id = $user_id;
        $product->name = $request->productName;
        $product->product_code = $request->productCode;
        $product->price = $request->price;
        $product->discount = $request->has('discount') ? $request->discount : null;
        $product->description = $request->description;
        $product->material_description = $request->materialDescription;
        $product->rating = 0;
        $product->total_reviews = 0;
        
        $totalQties = 0;

        $colors = json_decode($request->colorNqty);
        $colorAttributes = collect($colors)->map(function($color) {
            return ['color_quantity' => $color];
        });

        foreach ($colorAttributes as $colorQties) {
            $totalQties += $colorQties['color_quantity'];
        }

        $sizes = json_decode($request->sizeNqty);
        $sizeAttributes = collect($sizes)->map(function($size) {
            return ['size_quantity' => $size];
        });

        foreach ($sizeAttributes as $sizeQties) {
            $totalQties += $sizeQties['size_quantity'];
        }

        $product->total_quantities = $totalQties;
        
        $product->save();

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $image = new ProductImages();

                $imgFileName = time() . '_' . $file->getClientOriginalName();
                $image->product_id = $product->id;
                $image->name = $imgFileName;
                $image->path = $file->storeAs('productImages', $imgFileName, 'public');

                $image->save();
            }
        }

        $product->types()->attach(['type_id' => $request->type]);
        $product->childCategories()->attach(['child_category_id' => $request->childCategory]);
        $product->parentCategories()->attach(['parent_category_id' => $request->parentCategory]);
        $product->colors()->sync($colorAttributes);
        $product->sizes()->sync($sizeAttributes);

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

        return new ProductShowResource($product);
        // return response()->json($product);
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
        $product = Product::find($id);

        $product->brand()->associate($request->brand_name);
        

        $product->name = $request->product_name;
        $product->product_code = $request->product_code;
        $product->price = $request->price;
        $product->discount = $request->has('discount') ? ($request->discount > 0 ? $request->discount : null) : null;
        $product->description = $request->description;
        $product->material_description = $request->material_description;


        $totalQties = 0;

        $colorAttributes = collect($request->colorNqty)->map(function($color) {
            return ['color_quantity' => $color];
        });

        foreach ($colorAttributes as $colorQties) {
            $totalQties += $colorQties['color_quantity'];
        }

        $sizeAttributes = collect($request->sizeNqty)->map(function($size) {
            return ['size_quantity' => $size];
        });

        foreach ($sizeAttributes as $sizeQties) {
            $totalQties += $sizeQties['size_quantity'];
        }

        $product->total_quantities = $totalQties;

        $product->save();

        $product->types()->sync($request->type);
        
        $product->colors()->sync($colorAttributes);
        $product->sizes()->sync($sizeAttributes);

        $product->childCategories()->sync($request->child_cat);
        $product->parentCategories()->sync($request->parent_cat);

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

        $product->sizes()->detach();
        $product->colors()->detach();
        $product->childCategories()->detach();
        $product->parentCategories()->detach();
        $product->types()->detach();

        $reviews = Review::where('product_id', $id)->get();

        foreach ($reviews as $review) {
            $review->delete();
        }

        $images = ProductImages::where('product_id', $id)->get();

        foreach ($images as $image) {
            File::delete(public_path('/storage/' . $image->path));

            $image->delete();
        }

        $product->delete();

        return response()->json(['success' => 'Product deleted succesfully!']);
    }

    public function getRelDataForAddingProduct()
    {
        $relData = [
            'brands' => Brand::all(),
            'colors' => Color::all(),
            'sizes' => Size::all(),
            'childCats' => ChildCategory::info()->get(),
            'parentCats' => ParentCategory::info()->get(),
            'types' => Type::with('parentCats.childCats')->get()
        ];

        return response()->json($relData);
    }

    public function addNewImage(Request $request)
    {
        $productImages = ProductImages::where('product_id', $request->productId)->get();

        if ($productImages->count() < 5) {
            if ($request->hasFile('image')) {
                $newImage = new ProductImages();

                $imgFileName = time() . '_' . $request->image->getClientOriginalName();
                $newImage->product_id = $request->productId;
                $newImage->name = $imgFileName;
                $newImage->path = $request->image->storeAs('productImages', $imgFileName, 'public');

                $newImage->save();
            }
        } else {
            return response()->json(['success' => 'The limit (5) of images per product reached!']);
        }

        return response()->json(['success' => 'Product Image created succesfully!']);
    }

    public function replaceImage(Request $request) {
        if ($request->hasFile('image')) {
            $newImage = new ProductImages();

            $imgFileName = time() . '_' . $request->image->getClientOriginalName();
            $newImage->product_id = $request->productId;
            $newImage->name = $imgFileName;
            $newImage->path = $request->image->storeAs('productImages', $imgFileName, 'public');

            $newImage->save();

            $currentImage = ProductImages::find($request->productImageId);
            $currentImagePath = public_path('/storage/' . $currentImage->path);

            if (File::exists($currentImagePath)) {
                File::delete($currentImagePath);

                $currentImage->delete();
            }
        } else {
            return response()->json(['error' => 'Product Image replacement failed!']);
        }

        return response()->json(['success' => 'Product Image replaced succesfully!']);
    }

    public function productImageDestroy($id)
    {
        $productImage = ProductImages::find($id);
        $productImagePath = public_path('/storage/' . $productImage->path);

        if (File::exists($productImagePath)) {
            File::delete($productImagePath);

            $productImage->delete();
        }

        return response()->json(['success' => 'Product Image deleted succesfully!']);
    }

    public function getAllProducts()
    {
        $products = [
            'latestProducts' => Product::with('images')->orderBy('created_at', 'desc')->limit(3)->get(),
            'mostDiscountedProducts' => Product::with('images')->orderBy('discount', 'desc')->limit(3)->get(),
            'mostCommentedProducts' => Product::with('images')->orderBy('total_reviews', 'desc')->limit(3)->get()
        ];

        return response()->json($products);
    }

    public function products($type, $parentCat) 
    {
        $products = Product::whereHas('types', function ($query) use ($type) {
                        $query->where('type_id', $type);
                    })->whereHas('parentCategories', function ($query) use ($parentCat) {
                        $query->where('parent_category_id', $parentCat);
                    })
                    ->info()->withFilters(
                            request()->input('prices', []),
                            request()->input('brands', []),
                            request()->input('sizes', []),
                            request()->input('colors', []),
                        )
                    ->paginate(6);

        return response()->json($products);
    }
}
