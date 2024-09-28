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
        Schema::table('alat_kerjas', function (Blueprint $table) {
            $table->date('tgl_akhir_kontrak')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('alat_kerjas', function (Blueprint $table) {
            $table->dropColumn('tgl_akhir_kontrak');
        });
    }
};
