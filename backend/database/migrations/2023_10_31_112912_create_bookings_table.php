<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    { 
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('guest_name');
            $table->string('guest_email');
            $table->string('guest_phone')->nullable();
            $table->integer('num_adults')->nullable();
            $table->integer('num_children')->nullable();
            $table->decimal('payment_amount', 10, 2)->default(0.00);
            $table->string('payment_method')->nullable();
            $table->string('payment_option')->nullable();
            $table->string('payment_reference')->nullable();
            $table->enum('payment_status', ['unpaid', 'paid'])->default('unpaid');
            $table->enum('status', ['booked', 'cancelled', 'completed'])->default('booked');
            $table->timestamps();  
        }); 
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
