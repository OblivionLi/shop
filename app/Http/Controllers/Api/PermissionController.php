<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PermissionResource;
use App\Models\Permission;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return PermissionResource::collection(Permission::info()->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $permission = new Permission();

        $permission->name = $request->name;

        $permission->save();

        $response = [
            'message' => 'Permission created successfully'
        ];

        return response()->json($response, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $permission = Permission::info()->find($id);

        if ($permission) {
            return response()->json($permission);
        } else {
            return response()->json(["message" => "Permission can't be found"]);
        }
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
        $permission = Permission::find($id);

        if ($permission) {
            $permission->name = $request->name;

            $permission->save();
        } else {
            $response = ['message' => 'Permission edit failed', $permission];
            return response()->json($response, 200);
        }

        $response = ['message' => 'Permission edit successfully'];
        return response()->json($response, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $permission = Permission::find($id);

        if ($permission) {
            $permission->roles()->detach();

            $permission->delete();
        }

        $response = ['message' => 'Permission deleted successfully'];
        return response()->json($response, 200);
    }
}
