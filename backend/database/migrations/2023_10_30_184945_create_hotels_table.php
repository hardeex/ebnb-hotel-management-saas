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
        Schema::create('hotels', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('partner_id')->nullable();
            $table->string('name');
            $table->string('adresse');
            $table->string('location'); 
            $table->text('description');
            $table->string('contact');
            $table->string('email');
            $table->string('whatsapp');
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->string('website')->nullable();
            $table->enum('status', ['Open', 'Closed']);
            $table->integer('length_of_booking')->default(0);
            $table->string('bathroom')->nullable();
            $table->string('food_and_drink')->nullable();
            $table->string('safety_and_security')->nullable();
            $table->string('bedroom')->nullable();
            $table->string('outdoors')->nullable();
            $table->string('internet')->nullable();
            $table->string('general')->nullable();
            $table->string('parking')->nullable();
            $table->string('kitchen')->nullable();
            $table->string('transportation')->nullable();
            $table->string('room_amenities')->nullable();
            $table->string('front_desk')->nullable();
            $table->string('living_area')->nullable();
            $table->string('accessibility')->nullable();
            $table->string('media_and_technology')->nullable();
            $table->string('cleaning_services')->nullable();
            $table->string('health_and_wellness_facilities')->nullable();
            $table->string('business_facilities')->nullable();
            $table->string('languages')->nullable();
            $table->string('building_type')->nullable();
            $table->integer('number_of_rooms')->nullable();
            $table->time('checkin_time')->nullable();
            $table->time('checkout_time')->nullable();            
            $table->float('price_per_night');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hotels');
    }
};
