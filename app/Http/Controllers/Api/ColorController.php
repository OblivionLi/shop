<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreColorRequest;
use App\Http\Requests\UpdateColorRequest;
use App\Http\Resources\ColorResource;
use App\Models\Color;
use Illuminate\Http\Request;

class ColorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $colors = Color::with('products')->get();

        return ColorResource::collection($colors);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreColorRequest $request)
    {
        $color = new Color();

        $color->color_name = $request->color_name;
        $color->color_quantity = 0;

        $color->save();

        return response()->json(['success' => 'Color created successfully']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $color = Color::find($id);

        return response()->json($color);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateColorRequest $request, $id)
    {
        $color = Color::find($id);

        $color->color_name = $request->color_name;
        $color->color_quantity = $request->color_quantity;

        $color->save();

        return response()->json(['success' => 'Color updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $color = Color::find($id);
        
        $color->products()->sync([]);
        $color->delete();

        return response()->json(['success' => 'Color deleted successfully']);
    }
}
