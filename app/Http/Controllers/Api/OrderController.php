<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Color;
use App\Models\Order;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $orders = Order::all();

        return OrderResource::collection($orders);
    }

    public function adminIndex()
    {
        $orders = Order::info()->get();

        return response()->json($orders);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $order = new Order();

        $order->user_id = $request->user_id;
        $order->status = "PENDING";
        $order->total_price = $request->total_price;
        $order->tax_price = $request->tax_price;
        $order->shipping_price = $request->shipping_price;
        $order->products_discount_price = $request->items_price_discount;
        $order->products_price = $request->items_price;

        $order->save();

        foreach($request->cart_items as $item) {
            $order->products()->attach(
                $item['product'],
                [
                    'order_id' => $order->id,
                    'product_id' => $item['product'],
                    'qty' => $item['qty']
                ]
            );

            DB::table('color_product')->where('product_id', $item['product'])->decrement('color_quantity', $item['qty']);
            DB::table('size_product')->where('product_id', $item['product'])->decrement('size_quantity', $item['qty']);
            $totalQty = 2 * $item['qty'];
            DB::table('products')->where('id', $item['product'])->decrement('total_quantities', $totalQty);
        }

        $response = [
            'message' => 'Order placed successfully',
            'id' => $order->id
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
        $order = Order::info()->find($id);

        return response()->json($order);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function updateOrderToPaid($id) 
    {
        $order = Order::find($id);

        if($order) {
            $order->is_paid = 1;
            $order->paid_at = Carbon::now();
            $order->status = "PAID";

            $order->save();
        }

        return response()->json($order);
    }

    public function updateOrderToDelivered($id) 
    {
        $order = Order::find($id);

        if($order) {
            $order->is_delivered = 1;
            $order->delivered_at = Carbon::now();
            $order->status = "DELIVERED";

            $order->save();
        }

        return response()->json($order);
    }

    /**
     * Get all orders related to user
     */
    public function getUserOrders($id) 
    {
        $orders = Order::info()->where('user_id', $id)->get();

        return response()->json($orders);
    }

    public function countOrdersByMonth()
    {
        $orders = Order::select('id', 'created_at')->where('is_paid', 1)->get()->groupBy(function($date) {
            return Carbon::parse($date->created_at)->format('m');
        });

        $orderCount = [];
        $orderArr = [];

        foreach ($orders as $key => $value) {
            $orderCount[(int)$key] = count($value);
        }

        for ($i = 1; $i <= 12; $i++) {
            if (!empty($orderCount[$i])) {
                $orderArr[] = $orderCount[$i];
            } else {
                $orderArr[] = 0;
            }
        }

        return response()->json($orderArr);
    }

    public function getAllUserOrders()
    {
        $user_id = Auth::id();
        $orders = Order::info()->where('user_id', $user_id)->get();

        return response()->json($orders);
    }
}
