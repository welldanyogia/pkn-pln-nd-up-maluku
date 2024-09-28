<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
//            $table->string('category');
            $table->string('nama_pekerjaan');
//            $table->json('alat_kerja')->nullable(true); // Store alat_kerja as JSON
            $table->date('tanggal_efektif_kontrak');
            $table->string('jenis_kontrak')->nullable();
            $table->integer('jangka_waktu_bulan');
            $table->integer('jumlah_tenaga_kerja_sesuai_kontrak_fix_cost');
            $table->integer('realisasi_di_lapangan');
            $table->decimal('nilai_kontrak_inc_ppn', 15, 2);
            $table->date('akhir_kontrak');
            $table->string('status_sisa_jangka_waktu_kontrak_bulan');
            $table->text('keterangan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
