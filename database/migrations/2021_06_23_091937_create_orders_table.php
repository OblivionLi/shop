<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->string('status');
            $table->decimal('products_price', 8, 2);
            $table->decimal('products_discount_price', 8, 2);
            $table->decimal('shipping_price', 8, 2);
            $table->decimal('tax_price', 8, 2);
            $table->decimal('total_price', 8, 2);
            $table->boolean('is_paid')->default(false);
            $table->boolean('is_delivered')->default(false);
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('delivered_at')->nullable();
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
        Schema::dropIfExists('orders');
    }
}
