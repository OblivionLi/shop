<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreParentCategoryRequest;
use App\Http\Requests\UpdateParentCategoryRequest;
use App\Http\Resources\ParentCategoryResource;
use App\Models\ParentCategory;
use Illuminate\Http\Request;

class ParentCategoryController extends Controller
{
       /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $parent_categories = ParentCategory::with('childCats')->get();

        return ParentCategoryResource::collection($parent_categories);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreParentCategoryRequest $request)
    {
        $parent_category = new ParentCategory();

        $parent_category->parent_category_name = $request->parent_category_name;

        $parent_category->save();

        return response()->json(['success' => 'Parent Category created successfully']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $parent_category = ParentCategory::find($id);

        return response()->json($parent_category);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateParentCategoryRequest $request, $id)
    {
        $parent_category = ParentCategory::find($id);

        $parent_category->parent_category_name = $request->parent_category_name;

        $parent_category->save();

        return response()->json(['success' => 'Parent Category updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $parent_category = ParentCategory::find($id);
        
        $parent_category->childCats()->sync([]);
        $parent_category->delete();

        return response()->json(['success' => 'Parent Category deleted successfully']);
    }
}
