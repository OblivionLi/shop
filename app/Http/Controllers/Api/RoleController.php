<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoleRequest;
use App\Http\Resources\RoleResource;
use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return RoleResource::collection(Role::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RoleRequest $request)
    {
        $role = new Role();

        $role->name = $request->name;

        $role->save();

        $response = [
            'message' => 'Role created successfully'
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
        $role = Role::info()->find($id);

        if ($role) {
            return response()->json($role);
        } else {
            return response()->json(["message" => "Role can't be found"]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(RoleRequest $request, $id)
    {
        $role = Role::find($id);

        if ($role) {
            $role->name = $request->name;
            $role->is_admin = $request->is_admin;

            $role->save();

            $role->permissions()->sync($request->perms);
        } else {
            $response = ['message' => 'Role edit failed', $role];
            return response()->json($response, 200);
        }

        $response = ['message' => 'Role edit successfully'];
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
        $role = Role::find($id);

        if ($role) {
            $role->permissions()->detach();
            $role->users()->detach();

            $role->delete();
        }

        $response = ['message' => 'Role deleted successfully'];
        return response()->json($response, 200);
    }
}
