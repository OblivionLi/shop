<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Http\Resources\BrandResource;
use App\Models\Brand;
use App\Models\Product;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $brands = Brand::with('products')->get();

        return BrandResource::collection($brands);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBrandRequest $request)
    {
        $brand = new Brand();

        $brand->brand_name = $request->brand_name;

        $brand->save();

        return response()->json(['success' => 'Brand created successfully']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $brand = Brand::find($id);

        return response()->json($brand);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateBrandRequest $request, $id)
    {
        $brand = Brand::find($id);

        $brand->brand_name = $request->brand_name;

        $brand->save();

        return response()->json(['success' => 'Brand updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $brand = Brand::find($id);
        
        $brand->products()->delete();
        $brand->delete();

        return response()->json(['success' => 'Brand deleted successfully']);
    }

    public function brands($type, $parentCat, $childCat)
    {
        $brands = Brand::withCount(['products' => function ($query) use ($type, $parentCat, $childCat) {
            $query->whereHas('types', function ($query) use ($type) {
                $query->where('type_id', $type);
            });
            $query->whereHas('childCategories', function ($query) use ($childCat) {
                $query->where('child_category_id', $childCat);
            });
            $query->whereHas('parentCategories', function ($query) use ($parentCat) {
                $query->where('parent_category_id', $parentCat);
            });
            $query->withFilters(
                request()->input('prices', []),
                request()->input('brands', []),
                request()->input('sizes', []),
                request()->input('colors', []),
            );
        }])
        ->get();

        return response()->json($brands);
    }

    public function brandsByType($type)
    {
        $brands = Brand::withCount(['products' => function ($query) use ($type) {
            $query->whereHas('types', function ($query) use ($type) {
                $query->where('name', $type);
            });
            $query->withFilters(
                request()->input('prices', []),
                request()->input('brands', []),
                request()->input('sizes', []),
                request()->input('colors', []),
            );
        }])
        ->get();

        return response()->json($brands);
    }

    public function brandsByParentCategory($type, $parentCat)
    {
        $brands = Brand::withCount(['products' => function ($query) use ($type, $parentCat) {
            $query->whereHas('types', function ($query) use ($type) {
                $query->where('name', $type);
            });
            $query->whereHas('parentCategories', function ($query) use ($parentCat) {
                $query->where('parent_category_name', $parentCat);
            });
            $query->withFilters(
                request()->input('prices', []),
                request()->input('brands', []),
                request()->input('sizes', []),
                request()->input('colors', []),
            );
        }])
        ->get();

        return response()->json($brands);
    }
}
