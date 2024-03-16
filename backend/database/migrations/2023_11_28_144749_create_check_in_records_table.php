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
        Schema::create('check_in_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hotel_id')->constrained();
            $table->string('address')->nullable();
            $table->string('tel_number')->nullable();
            $table->string('emergency_number')->nullable();
            $table->string('identity')->nullable();
            $table->string('id_number')->nullable();
            $table->string('number_of_people')->nullable();
            $table->string('nationality')->nullable();
            $table->string('country_of_residence')->nullable();
            $table->string('duration')->nullable();
            $table->decimal('price_per_night', 10, 2)->nullable();
            $table->string('email')->nullable();
            $table->string('name')->nullable();
            $table->decimal('deposit', 10, 2)->nullable();
            $table->decimal('balance', 10, 2)->nullable();
            $table->date('check_in_date')->nullable();
            $table->dateTime('check_in_time')->nullable();
            $table->dateTime('check_out')->nullable();
            $table->dateTime('check_out_date')->nullable();
            $table->dateTime('check_out_time')->nullable();
            $table->decimal('total_amount_paid', 10, 2)->nullable();
            $table->decimal('restaurant_bar_bill', 10, 2)->nullable();
            $table->string('travelling_from')->nullable();
            $table->string('travelling_to')->nullable();
            $table->string('additional_facilities')->nullable();
            $table->string('other_comments')->nullable();
            $table->string('ref')->nullable();
            $table->string('hotel_location')->nullable();
            $table->string('branch_name')->nullable();
            $table->string('signature')->nullable();
            $table->string('customer_signature')->nullable();
            $table->string('received_by')->nullable();
            $table->dateTime('booking_date');
            $table->enum('payment_method', ['cash', 'cheque', 'card', 'transfer']);
            $table->enum('booking_method', ['phone', 'internet', 'agent', 'in_person']);
            $table->enum('purpose_of_visit', ['holiday', 'business', 'others'])->default('others');
            $table->string('other_purpose_of_visit')->nullable();
            $table->timestamps();
        });
    } 

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('check_in_records');
    }
};
