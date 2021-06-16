<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreignId('brand_id')->constrained();
            $table->string('name');
            $table->string('product_code');
            $table->decimal('price', 8, 2);
            $table->integer('discount')->nullable();
            $table->text('description');
            $table->text('material_description');
            $table->decimal('rating', 2, 1)->nullable();
            $table->integer('total_reviews')->nullable();
            $table->integer('total_quantities');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
