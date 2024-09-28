<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AlatKerjaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $alatKerjas = [
            [
                'project_id' => 1,
                'nama_alat' => 'Helm Safety SNI',
                'tgl_kontrak' => '2023-04-17',
                'masa_pakai' => 12,
                'masa_pakai_saat_ini' => 17,
                'sisa_masa_pakai' => -5,
                'keterangan' => 'SUDAH BERAKHIR',
            ],
            [
                'project_id' => 1,
                'nama_alat' => 'Kacamata Safety (bening)',
                'tgl_kontrak' => '2023-04-17',
                'masa_pakai' => 12,
                'masa_pakai_saat_ini' => 17,
                'sisa_masa_pakai' => -5,
                'keterangan' => 'SUDAH BERAKHIR',
            ],
            [
                'project_id' => 1,
                'nama_alat' => 'Sepatu Safety',
                'tgl_kontrak' => '2023-04-17',
                'masa_pakai' => 12,
                'masa_pakai_saat_ini' => 17,
                'sisa_masa_pakai' => -5,
                'keterangan' => 'SUDAH BERAKHIR',
            ],
            [
                'project_id' => 1,
                'nama_alat' => 'Pakaian Seragam',
                'tgl_kontrak' => '2023-04-17',
                'masa_pakai' => 12,
                'masa_pakai_saat_ini' => 17,
                'sisa_masa_pakai' => -5,
                'keterangan' => 'SUDAH BERAKHIR',
            ],
            [
                'project_id' => 1, // This can also be project 2, 3, or 4 based on your requirement
                'nama_alat' => 'Jas Hujan',
                'tgl_kontrak' => '2023-04-17',
                'masa_pakai' => 12,
                'masa_pakai_saat_ini' => 17,
                'sisa_masa_pakai' => -5,
                'keterangan' => 'SUDAH BERAKHIR',
            ],
            [
                'project_id' => 2,
                'nama_alat' => 'Helm Safety SNI',
                'tgl_kontrak' => '2023-04-17',
                'masa_pakai' => 12,
                'masa_pakai_saat_ini' => 17,
                'sisa_masa_pakai' => -5,
                'keterangan' => 'SUDAH BERAKHIR',
            ],
            [
                'project_id' => 2,
                'nama_alat' => 'Kacamata Safety (bening)',
                'tgl_kontrak' => '2023-04-17',
                'masa_pakai' => 12,
                'masa_pakai_saat_ini' => 17,
                'sisa_masa_pakai' => -5,
                'keterangan' => 'SUDAH BERAKHIR',
            ],
            [
                'project_id' => 2,
                'nama_alat' => 'Sepatu Safety',
                'tgl_kontrak' => '2023-04-17',
                'masa_pakai' => 12,
                'masa_pakai_saat_ini' => 17,
                'sisa_masa_pakai' => -5,
                'keterangan' => 'SUDAH BERAKHIR',
            ],
            [
                'project_id' => 2,
                'nama_alat' => 'Pakaian Seragam',
                'tgl_kontrak' => '2023-04-17',
                'masa_pakai' => 12,
                'masa_pakai_saat_ini' => 17,
                'sisa_masa_pakai' => -5,
                'keterangan' => 'SUDAH BERAKHIR',
            ],
            [
                'project_id' => 2, // This can also be project 2, 3, or 4 based on your requirement
                'nama_alat' => 'Jas Hujan',
                'tgl_kontrak' => '2023-04-17',
                'masa_pakai' => 12,
                'masa_pakai_saat_ini' => 17,
                'sisa_masa_pakai' => -5,
                'keterangan' => 'SUDAH BERAKHIR',
            ],
            [
                'project_id' => 3,
                'nama_alat' => 'Helm Safety SNI',
                'tgl_kontrak' => '2023-04-17',
                'masa_pakai' => 12,
                'masa_pakai_saat_ini' => 17,
                'sisa_masa_pakai' => -5,
                'keterangan' => 'SUDAH BERAKHIR',
            ],
            [
                'project_id' => 3,
                'nama_alat' => 'Kacamata Safety (bening)',
                'tgl_kontrak' => '2023-04-17',
                'masa_pakai' => 12,
                'masa_pakai_saat_ini' => 17,
                'sisa_masa_pakai' => -5,
                'keterangan' => 'SUDAH BERAKHIR',
            ],
            [
                'project_id' => 3,
                'nama_alat' => 'Sepatu Safety',
                'tgl_kontrak' => '2023-04-17',
                'masa_pakai' => 12,
                'masa_pakai_saat_ini' => 17,
                'sisa_masa_pakai' => -5,
                'keterangan' => 'SUDAH BERAKHIR',
            ],
            [
                'project_id' => 3,
                'nama_alat' => 'Pakaian Seragam',
                'tgl_kontrak' => '2023-04-17',
                'masa_pakai' => 12,
                'masa_pakai_saat_ini' => 17,
                'sisa_masa_pakai' => -5,
                'keterangan' => 'SUDAH BERAKHIR',
            ],
            [
                'project_id' => 3, // This can also be project 2, 3, or 4 based on your requirement
                'nama_alat' => 'Jas Hujan',
                'tgl_kontrak' => '2023-04-17',
                'masa_pakai' => 12,
                'masa_pakai_saat_ini' => 17,
                'sisa_masa_pakai' => -5,
                'keterangan' => 'SUDAH BERAKHIR',
            ],
            [
                'project_id' => 4,
                'nama_alat' => 'Helm Safety SNI',
                'tgl_kontrak' => '2023-04-17',
                'masa_pakai' => 12,
                'masa_pakai_saat_ini' => 17,
                'sisa_masa_pakai' => -5,
                'keterangan' => 'SUDAH BERAKHIR',
            ],
            [
                'project_id' => 4,
                'nama_alat' => 'Kacamata Safety (bening)',
                'tgl_kontrak' => '2023-04-17',
                'masa_pakai' => 12,
                'masa_pakai_saat_ini' => 17,
                'sisa_masa_pakai' => -5,
                'keterangan' => 'SUDAH BERAKHIR',
            ],
            [
                'project_id' => 4,
                'nama_alat' => 'Sepatu Safety',
                'tgl_kontrak' => '2023-04-17',
                'masa_pakai' => 12,
                'masa_pakai_saat_ini' => 17,
                'sisa_masa_pakai' => -5,
                'keterangan' => 'SUDAH BERAKHIR',
            ],
            [
                'project_id' => 4,
                'nama_alat' => 'Pakaian Seragam',
                'tgl_kontrak' => '2023-04-17',
                'masa_pakai' => 12,
                'masa_pakai_saat_ini' => 17,
                'sisa_masa_pakai' => -5,
                'keterangan' => 'SUDAH BERAKHIR',
            ],
            [
                'project_id' => 4, // This can also be project 2, 3, or 4 based on your requirement
                'nama_alat' => 'Jas Hujan',
                'tgl_kontrak' => '2023-04-17',
                'masa_pakai' => 12,
                'masa_pakai_saat_ini' => 17,
                'sisa_masa_pakai' => -5,
                'keterangan' => 'SUDAH BERAKHIR',
            ],
        ];

        foreach ($alatKerjas as $alat) {
            DB::table('alat_kerjas')->insert([
                'id' => Str::uuid(),
                'project_id' => $alat['project_id'],
                'nama_alat' => $alat['nama_alat'],
                'tgl_kontrak' => $alat['tgl_kontrak'],
                'masa_pakai' => $alat['masa_pakai'],
                'masa_pakai_saat_ini' => $alat['masa_pakai_saat_ini'],
                'sisa_masa_pakai' => $alat['sisa_masa_pakai'],
                'keterangan' => $alat['keterangan'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
