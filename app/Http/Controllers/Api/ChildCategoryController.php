<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreChildCategoryRequest;
use App\Http\Requests\UpdateChildCategoryRequest;
use App\Http\Resources\ChildCategoryResource;
use App\Models\ChildCategory;
use Illuminate\Http\Request;

class ChildCategoryController extends Controller
{
       /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $child_categories = ChildCategory::info()->get();

        return ChildCategoryResource::collection($child_categories);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreChildCategoryRequest $request)
    {
        $child_category = new ChildCategory();

        $child_category->child_category_name = $request->child_category_name;
        $child_category->parent_category_id = $request->parent_category_name;

        $child_category->save();

        return response()->json(['success' => 'Child Category created successfully']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $child_category = ChildCategory::with('parentCat', 'parentCat.type')->find($id);

        return response()->json($child_category);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateChildCategoryRequest $request, $id)
    {
        $child_category = ChildCategory::find($id);

        $child_category->child_category_name = $request->child_category_name;
        $child_category->parent_category_id = $request->parent_category_name;

        $child_category->save();

        return response()->json(['success' => 'Child Category updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $child_category = ChildCategory::find($id);
        
        $child_category->products()->sync([]);
        $child_category->delete();

        return response()->json(['success' => 'Child Category deleted successfully']);
    }
}
