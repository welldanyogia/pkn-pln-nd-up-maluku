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
        Schema::table('tenaga_kerjas', function (Blueprint $table) {
            $table->integer('usia')->nullable();
            $table->integer('sisa_masa_pensiun')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tenaga_kerjas', function (Blueprint $table) {
            $table->dropColumn(['usia', 'sisa_masa_pensiun']);
        });
    }
};
