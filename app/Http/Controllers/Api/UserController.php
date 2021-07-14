<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::info()->get();

        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::info()->find($id);

        if ($user) {
            return response()->json($user);
        } else {
            return response()->json(['message' => "User can't be found"]);
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
        $user = User::find($id);
        if ($user) {
            $user->name = $request->name;
            $user->email = $request->email;

            $user->save();

            $user->roles()->sync($request->role);
        } else {
            $response = ['message' => 'User update failed', $user];
            return response()->json($response, 200);
        }

        $response = ['message' => 'User updated successfully'];
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
        $user = User::find($id);

        if ($user) {
            $user->roles()->detach();

            $user->delete();
        }

        $response = ['message' => 'User deleted successfully'];
        return response()->json($response, 200);
    }

    public function countUsersByMonth()
    {
        $users = User::select('id', 'created_at')->get()->groupBy(function($date) {
            return Carbon::parse($date->created_at)->format('m');
        });

        $userCount = [];
        $userArr = [];

        foreach ($users as $key => $value) {
            $userCount[(int)$key] = count($value);
        }

        for ($i = 1; $i <= 12; $i++) {
            if (!empty($userCount[$i])) {
                $userArr[] = $userCount[$i];
            } else {
                $userArr[] = 0;
            }
        }

        return response()->json($userArr);
    }
}
