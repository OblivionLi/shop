<?php

use App\Http\Controllers\Api\AddressController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\CheckoutController;
use App\Http\Controllers\Api\ChildCategoryController;
use App\Http\Controllers\Api\ColorController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ParentCategoryController;
use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\PriceController;
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




// Routes to display products with filters by type
Route::get('brands/type/{type}', [BrandController::class, 'brandsByType']);
Route::get('sizes/type/{type}', [SizeController::class, 'sizesByType']);
Route::get('colors/type/{type}', [ColorController::class, 'colorsByType']);
Route::get('products/type/{type}', [ProductController::class, 'productsByType']);

// Routes to display products with filters by parent category
Route::get('brands/type/{type}/parent-category/{parentCat}', [BrandController::class, 'brandsByParentCategory']);
Route::get('sizes/type/{type}/parent-category/{parentCat}', [SizeController::class, 'sizesByParentCategory']);
Route::get('colors/type/{type}/parent-category/{parentCat}', [ColorController::class, 'colorsByParentCategory']);
Route::get('products/type/{type}/parent-category/{parentCat}', [ProductController::class, 'productsByParentCategory']);

// Route to display products with filters
Route::get('brands/type/{type}/parent-category/{parentCat}/child-category/{childCat}', [BrandController::class, 'brands']);
Route::get('sizes/type/{type}/parent-category/{parentCat}/child-category/{childCat}', [SizeController::class, 'sizes']);
Route::get('colors/type/{type}/parent-category/{parentCat}/child-category/{childCat}', [ColorController::class, 'colors']);
Route::get('products/type/{type}/parent-category/{parentCat}/child-category/{childCat}', [ProductController::class, 'products']);

Route::get('prices', [PriceController::class, 'index']);

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
Route::get('config/stripe', [CheckoutController::class, 'index']);
Route::post('payment_intents', [CheckoutController::class, 'createPayIntent']);

Route::group(['middleware' => 'auth:api'], function () {
    Route::get('logout', [AuthController::class, 'logout']);
    Route::post('product/{product}/review', [ReviewController::class, 'save']);

    Route::post('order', [OrderController::class, 'store']);
    Route::get('order/{order}', [OrderController::class, 'show']);
    Route::patch('order/{order}/pay', [OrderController::class, 'updateOrderToPaid']);
    
    Route::get('address', [AddressController::class, 'index']);
    Route::post('address', [AddressController::class, 'store']);
    Route::get('address/{address}', [AddressController::class, 'show']);
    Route::patch('address/{address}', [AddressController::class, 'update']);
    Route::delete('address/{address}', [AddressController::class, 'destroy']);
    
    Route::get('users/{user}', [UserController::class, 'show']);
    Route::get('profile/{profile}', [AuthController::class, 'getUser']);
    Route::patch('profile/{profile}', [AuthController::class, 'updateUser']);

    Route::get('childCat/{childCat}', [ChildCategoryController::class, 'show']);
    
    Route::group(['middleware' => 'isAdmin'], function () {
        Route::get('admin/order', [OrderController::class, 'adminIndex']);
        Route::patch('order/{order}/delivered', [OrderController::class, 'updateOrderToDelivered']);

        Route::get('reviews', [ReviewController::class, 'index']);
        Route::get('reviews/{review}', [ReviewController::class, 'show']);
        Route::patch('reviews/{review}', [ReviewController::class, 'update']);
        Route::delete('reviews/{review}', [ReviewController::class, 'destroy']);

        Route::get('users', [UserController::class, 'index']);
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
        Route::patch('childCat/{childCat}', [ChildCategoryController::class, 'update']);
        Route::delete('childCat/{childCat}', [ChildCategoryController::class, 'destroy']);
    });
});
