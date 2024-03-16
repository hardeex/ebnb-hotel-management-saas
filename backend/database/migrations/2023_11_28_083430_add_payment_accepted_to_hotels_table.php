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
            $table->enum('payment_accepted', ['cash', 'visa', 'cheque', 'master_card', 'verse'])->default('cash');
            $table->enum('payment_currency', ['usd', 'eur', 'gbp', 'ngn', 'others'])->default('ngn');
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
