<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Stripe\PaymentIntent;
use Stripe\Stripe;

class CheckoutController extends Controller
{
    public function index()
    {
        return response()->json(config('stripe.STRIPE_SECRET'), 200);
    }

    public function createPayIntent(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));
        
        $payment_intent = PaymentIntent::create([
            'description' => 'Test Stripe Payment',
            'amount' => $request->amount * 100,
            'currency' => 'eur',
            'payment_method_types' => ['card'],
        ]);

        $intent = $payment_intent->client_secret;

        return response()->json($intent);
    }
}
