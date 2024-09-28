<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class TenagaKerja extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'project_id',
        'unit_pln',
        'penempatan',
        'no_spk',
        'nip',
        'nama',
        'jabatan',
        'tempat_lahir',
        'tanggal_lahir',
        'usia',
        'sisa_masa_pensiun'
    ];

    // Disable auto-incrementing for the ID
    public $incrementing = false;

    // Set the ID type to UUID
    protected $keyType = 'string';

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid(); // Generate UUID
            }
        });
    }

    // Relation to Project
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
    public function documents()
    {
        return $this->hasMany(Document::class, 'tenaga_kerja_id');
    }
}
