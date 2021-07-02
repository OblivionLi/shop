<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $addresses = Address::with('user')->get();

        return response()->json($addresses);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = User::find($request->userId);

        $addressDetails = [
            "user_id" => $request->userId,
            "name" => $request->name,
            "surname" => $request->surname,
            "country" => $request->country,
            "city" => $request->city,
            "address" => $request->address,
            "postal_code" => $request->postal_code,
            "phone_number" => $request->phone_number,
        ];

        if (!$user->addresses()->exists()) {
            $userAddress = new Address($addressDetails);
            $user->addresses()->save($userAddress);
        } else {
            $user->addresses()->update($addressDetails);
        }

        return response()->json(['success' => 'Address created successfully']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $address = Address::where('user_id', $id)->get();

        return response()->json($address);
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
        $address = Address::find($id);

        $address->name = $request->name;
        $address->surname = $request->surname;
        $address->country = $request->country;
        $address->city = $request->city;
        $address->address = $request->address;
        $address->postal_code = $request->postal_code;
        $address->phone_number = $request->phone_number;

        $address->save();

        return response()->json(['success' => 'Address updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $address = Address::find($id);
        
        $address->delete();

        return response()->json(['success' => 'Address deleted successfully']);
    }
}
