<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\ChildCategoryController;
use App\Http\Controllers\Api\ColorController;
use App\Http\Controllers\Api\ParentCategoryController;
use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\SizeController;
use App\Http\Controllers\Api\TypeController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login'])->name('login');
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::patch('/reset-password/{user}', [AuthController::class, 'resetPassword']);
Route::get('/reset-password/{token}', [AuthController::class, 'getToken']);

Route::get('listParentCat', [ParentCategoryController::class, 'index']);
Route::get('listProductsBy', [ProductController::class, 'getAllProducts']);
Route::get('product/{product}', [ProductController::class, 'show']);
Route::get('relDetails', [ProductController::class, 'getRelDataForAddingProduct']);
Route::get('reviews/product/{product}', [ReviewController::class, 'reviewsPag']);

Route::group(['middleware' => 'auth:api'], function () {
    Route::get('logout', [AuthController::class, 'logout']);
    Route::post('product/{product}/review', [ReviewController::class, 'save']);

    Route::group(['middleware' => 'isAdmin'], function () {
        Route::get('reviews', [ReviewController::class, 'index']);
        Route::get('reviews/{review}', [ReviewController::class, 'show']);
        Route::patch('reviews/{review}', [ReviewController::class, 'update']);
        Route::delete('reviews/{review}', [ReviewController::class, 'destroy']);

        Route::get('users', [UserController::class, 'index']);
        Route::get('users/{user}', [UserController::class, 'show']);
        Route::patch('users/{user}', [UserController::class, 'update']);
        Route::delete('users/{user}', [UserController::class, 'destroy']);

        Route::get('roles', [RoleController::class, 'index']);
        Route::post('roles', [RoleController::class, 'store']);
        Route::get('roles/{role}', [RoleController::class, 'show']);
        Route::patch('roles/{role}', [RoleController::class, 'update']);
        Route::delete('roles/{role}', [RoleController::class, 'destroy']);

        Route::get('product', [ProductController::class, 'index']);
        Route::post('product', [ProductController::class, 'store']);
        Route::patch('product/{product}', [ProductController::class, 'update']);
        Route::delete('product/{product}', [ProductController::class, 'destroy']);
        Route::post('productImage/{productId}', [ProductController::class, 'addNewImage']);
        Route::post('RproductImage/{productImageId}', [ProductController::class, 'replaceImage']);
        Route::delete('productImage/{productImageId}', [ProductController::class, 'productImageDestroy']);


        Route::get('permissions', [PermissionController::class, 'index']);
        Route::post('permissions', [PermissionController::class, 'store']);
        Route::get('permissions/{permission}', [PermissionController::class, 'show']);
        Route::patch('permissions/{permission}', [PermissionController::class, 'update']);
        Route::delete('permissions/{permission}', [PermissionController::class, 'destroy']);

        Route::get('brand', [BrandController::class, 'index']);
        Route::post('brand', [BrandController::class, 'store']);
        Route::get('brand/{brand}', [BrandController::class, 'show']);
        Route::patch('brand/{brand}', [BrandController::class, 'update']);
        Route::delete('brand/{brand}', [BrandController::class, 'destroy']);

        Route::get('type', [TypeController::class, 'index']);
        Route::post('type', [TypeController::class, 'store']);
        Route::get('type/{type}', [TypeController::class, 'show']);
        Route::patch('type/{type}', [TypeController::class, 'update']);
        Route::delete('type/{type}', [TypeController::class, 'destroy']);

        Route::get('color', [ColorController::class, 'index']);
        Route::post('color', [ColorController::class, 'store']);
        Route::get('color/{color}', [ColorController::class, 'show']);
        Route::patch('color/{color}', [ColorController::class, 'update']);
        Route::delete('color/{color}', [ColorController::class, 'destroy']);

        Route::get('size', [SizeController::class, 'index']);
        Route::post('size', [SizeController::class, 'store']);
        Route::get('size/{size}', [SizeController::class, 'show']);
        Route::patch('size/{size}', [SizeController::class, 'update']);
        Route::delete('size/{size}', [SizeController::class, 'destroy']);

        Route::get('parentCat', [ParentCategoryController::class, 'index']);
        Route::post('parentCat', [ParentCategoryController::class, 'store']);
        Route::get('parentCat/{parentCat}', [ParentCategoryController::class, 'show']);
        Route::patch('parentCat/{parentCat}', [ParentCategoryController::class, 'update']);
        Route::delete('parentCat/{parentCat}', [ParentCategoryController::class, 'destroy']);

        Route::get('childCat', [ChildCategoryController::class, 'index']);
        Route::post('childCat', [ChildCategoryController::class, 'store']);
        Route::get('childCat/{childCat}', [ChildCategoryController::class, 'show']);
        Route::patch('childCat/{childCat}', [ChildCategoryController::class, 'update']);
        Route::delete('childCat/{childCat}', [ChildCategoryController::class, 'destroy']);
    });

   

    // Route::get('users', 'App\Http\Controllers\Api\UserController@index');
    // Route::get('users/{user}', 'App\Http\Controllers\Api\UserController@show');
    // Route::patch('users/{user}', 'App\Http\Controllers\Api\UserController@update')->middleware('isAdmin');
    // Route::delete('users/{user}', 'App\Http\Controllers\Api\UserController@destroy')->middleware('isAdmin');
    // Route::get('profile', 'App\Http\Controllers\Api\AuthController@user');
    // Route::patch('profile/{profile}', 'App\Http\Controllers\Api\AuthController@updateUser');

    // Route::get('orders', 'App\Http\Controllers\Api\OrderController@index');
    // Route::get('admin/orders', 'App\Http\Controllers\Api\OrderController@index')->middleware('isAdmin');
    // Route::post('orders', 'App\Http\Controllers\Api\OrderController@store');
    // Route::get('orders/{order}', 'App\Http\Controllers\Api\OrderController@show');
    // Route::get('/myorders/{order}', 'App\Http\Controllers\Api\OrderController@getUserOrders');
    // Route::patch('orders/{order}/pay', 'App\Http\Controllers\Api\OrderController@updateOrderToPaid');
    // Route::patch('orders/{order}/delivered', 'App\Http\Controllers\Api\OrderController@updateOrderToDelivered')->middleware('isAdmin');

    // Route::apiResource('users', 'App\Http\Controllers\Api\AuthController');
    // Route::apiResource('admin/roles', 'App\Http\Controllers\Api\RoleController');
});
