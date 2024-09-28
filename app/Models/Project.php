<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'nama_pekerjaan',
        'alat_kerja',
        'tanggal_efektif_kontrak',
        'jenis_kontrak',
        'jangka_waktu_bulan',
        'jumlah_tenaga_kerja_sesuai_kontrak_fix_cost',
        'realisasi_di_lapangan',
        'nilai_kontrak_inc_ppn',
        'akhir_kontrak',
        'status_sisa_jangka_waktu_kontrak_bulan',
        'keterangan'
    ];

    protected $casts = [
        'alat_kerja' => 'array',
        'tanggal_efektif_kontrak' => 'date',
        'akhir_kontrak' => 'date',
        'nilai_kontrak_inc_ppn' => 'decimal:2',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function alatKerjas()
    {
        return $this->hasMany(AlatKerja::class);
    }

    public function employees()
    {
        return $this->hasMany(TenagaKerja::class);
    }
}
