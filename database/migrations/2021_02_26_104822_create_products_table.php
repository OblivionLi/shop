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
            $table->string('name');
            $table->string('product_code');
            $table->decimal('price', 8, 2);
            $table->integer('discount');
            $table->text('description');
            $table->text('material_description');
            $table->decimal('rating', 2, 1);
            $table->integer('total_reviews');
            $table->string('type');
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
