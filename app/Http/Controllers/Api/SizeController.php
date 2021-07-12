<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSizeRequest;
use App\Http\Requests\UpdateSizeRequest;
use App\Http\Resources\SizeResources;
use App\Models\Size;
use Illuminate\Http\Request;

class SizeController extends Controller
{
        /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sizes = Size::with('products')->get();

        return SizeResources::collection($sizes);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSizeRequest $request)
    {
        $size = new Size();

        $size->size_name = $request->size_name;

        $size->save();

        return response()->json(['success' => 'Size created successfully']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $size = Size::find($id);

        return response()->json($size);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSizeRequest $request, $id)
    {
        $size = Size::find($id);

        $size->size_name = $request->size_name;

        $size->save();

        return response()->json(['success' => 'Size updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $size = Size::find($id);
        
        $size->products()->sync([]);
        $size->delete();

        return response()->json(['success' => 'Size deleted successfully']);
    }

    public function sizes($type, $parentCat, $childCat) 
    {
        $sizes = Size::withCount(['products' => function ($query) use ($type, $parentCat, $childCat) {
            $query->whereHas('types', function ($query) use ($type) {
                $query->where('type_id', $type);
            });
            $query->whereHas('parentCategories', function ($query) use ($parentCat) {
                $query->where('parent_category_id', $parentCat);
            });
            $query->whereHas('childCategories', function ($query) use ($childCat) {
                $query->where('child_category_id', $childCat);
            });
            $query->withFilters(
                request()->input('prices', []),
                request()->input('brands', []),
                request()->input('sizes', []),
                request()->input('colors', []),
            );
        }])
        ->get();

        return response()->json($sizes);
    }

    public function sizesByType($type) 
    {
        $sizes = Size::withCount(['products' => function ($query) use ($type) {
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

        return response()->json($sizes);
    }

    public function sizesByParentCategory($type, $parentCat) 
    {
        $sizes = Size::withCount(['products' => function ($query) use ($type, $parentCat) {
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

        return response()->json($sizes);
    }
}
