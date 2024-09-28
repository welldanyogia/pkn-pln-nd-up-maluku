<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AlatKerja extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'alat_kerjas';

    // Specify the primary key is a UUID
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'uuid';

    // Allow mass assignment for these fields
    protected $fillable = [
        'project_id',
        'nama_alat',
        'tgl_kontrak',
        'tgl_akhir_kontrak',
        'masa_pakai',
        'masa_pakai_saat_ini',
        'sisa_masa_pakai',
        'keterangan',
    ];

    /**
     * Define the relationship: An AlatKerja belongs to a Project.
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
