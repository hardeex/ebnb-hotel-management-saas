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
        Schema::table('hotels', function (Blueprint $table) {
            $table->text('electricity_24hrs')->nullable();
            $table->text('front_desk_24hrs')->nullable();
            $table->text('guest')->nullable();
            $table->text('heating')->nullable();
            $table->text('bar')->nullable();
            $table->text('restaurant')->nullable();
            $table->text('lounge')->nullable();
            $table->text('terrace')->nullable();
            $table->text('garden')->nullable();
            $table->text('luggage_storage')->nullable();
            $table->text('indoor_poor')->nullable();
            $table->text('outdoor_poor')->nullable();
            $table->text('hot_tub_jacuzzi')->nullable();
            $table->text('sauna')->nullable();
            $table->text('steam_room')->nullable();
            $table->text('spa_welness_center')->nullable();
            $table->text('hamman')->nullable();
            $table->text('fitness_center_gym')->nullable();
            $table->text('elevator_lift')->nullable();
            $table->text('cctv_cemera_security')->nullable();
            $table->text('security_guard')->nullable();
            $table->text('parking_nearby')->nullable();
            $table->text('mobile_phone_reception')->nullable();
            $table->text('none_smoking_public_area')->nullable();
            $table->text('rooms_facilities_for_disable')->nullable();
            $table->text('valet_parking')->nullable();
            $table->text('safety_deposit_boxes')->nullable();
            $table->text('in_room_safe')->nullable();
            $table->text('fireplace')->nullable();
            $table->text('meeting_banquests_facilities')->nullable();
            $table->text('breakfast')->nullable();
            $table->text('buffet_breakfast')->nullable();
            $table->text('babysitting')->nullable();
            $table->text('laundry')->nullable();
            $table->text('car_hire')->nullable();
            $table->text('room_service_24hrs')->nullable();
            $table->text('room_service_limited_hours')->nullable();
            $table->text('dry_cleaning')->nullable();
            $table->text('business_center')->nullable();
            $table->text('fax')->nullable();
            $table->text('photocopy')->nullable();
            $table->text('concierge_service')->nullable();
            $table->text('airport_suttle')->nullable();
            $table->text('electronic_room_key')->nullable();
            $table->text('pets_allowed')->nullable();
            $table->text('family_rooms')->nullable();
            $table->text('soundproofed_rooms')->nullable();
            $table->text('atm_machine')->nullable();
            $table->text('money_exchange')->nullable();
            $table->text('casino')->nullable();
            $table->text('outdoor_dinning')->nullable();
            $table->text('parking_security')->nullable();
            $table->text('survelance')->nullable();
            $table->text('tea_facilities')->nullable();
            $table->text('cubicle_shower')->nullable();
            $table->text('bath_tube')->nullable();
            $table->text('flat_screen_tv')->nullable();
            $table->text('wake_up_alarm')->nullable();
            $table->text('services_charge')->nullable();
            $table->text('emergency_exit')->nullable();
            $table->text('hair_dryer')->nullable();
            $table->text('first_aid_box')->nullable();
            $table->text('mobile_police')->nullable();
            $table->text('room_panic_system')->nullable();
            $table->text('warning_alarm')->nullable();
            $table->text('swing_bar_lock')->nullable();
            $table->text('auto_door_guard')->nullable();
            $table->text('chain_door_guard')->nullable();
            $table->text('door_pechole')->nullable();
            $table->text('finger_print_lock')->nullable();
            $table->text('key_card')->nullable();
            $table->text('door_motion_sensor')->nullable();
            $table->text('smoke_detective')->nullable();
            $table->text('invividual_room_decoder')->nullable();
            $table->text('smoke_room')->nullable();
            $table->text('bathroom_amenities')->nullable();
            $table->text('twing_bed')->nullable();
            $table->text('room_parlour_suite')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hotels', function (Blueprint $table) {
            //
        });
    }
};
