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
        Schema::table('rooms', function (Blueprint $table) {
            $table->enum('room_type', [
                'super_executive',
                'executive',
                'standard_executive',
                'room_apartment',
                'transit',
                'transit_single',
                'transit_budget',
                'transit_standard',
                'standard',
                'executive_suite'
            ])->default('standard');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('rooms', function (Blueprint $table) {
            $table->dropColumn('room_type');
        });
    }
};
