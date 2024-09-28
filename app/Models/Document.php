<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Document extends Model
{
    use HasFactory;
    protected $fillable = ['id', 'tenaga_kerja_id', 'file_name', 'file_path'];

    public $incrementing = false; // Disable auto-incrementing for the ID
    protected $keyType = 'string'; // Specify that the ID is a string (UUID)

    // Automatically generate UUID when creating a new Document
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    public function tenagaKerja()
    {
        return $this->belongsTo(TenagaKerja::class, 'tenaga_kerja_id');
    }
}
