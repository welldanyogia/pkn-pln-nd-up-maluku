<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            [
                'category' => 'PEMBANGKIT',
                'nama_pekerjaan' => 'LISDES ZONA MALUKU',
                'alat_kerja' => [
                    'total_alat_kerja' => 10,
                    'kritis' => 2,
                    'normal' => 6,
                    'kronis' => 2,
                ],
                'tanggal_efektif_kontrak' => '2022-06-30',
                'jenis_kontrak' => '',
                'jangka_waktu_bulan' => 60,
                'jumlah_tenaga_kerja_sesuai_kontrak_fix_cost' => 184,
                'realisasi_di_lapangan' => 176,
                'nilai_kontrak_inc_ppn' => 10000000,
                'akhir_kontrak' => '2027-07-31',
                'status_sisa_jangka_waktu_kontrak_bulan' => 36,
                'keterangan' => '',
            ],
            [
                'category' => 'PEMBANGKIT',
                'nama_pekerjaan' => 'LISDES ZONA MALUKU UTARA',
                'alat_kerja' => [
                    'total_alat_kerja' => 8,
                    'kritis' => 1,
                    'normal' => 6,
                    'kronis' => 1,
                ],
                'tanggal_efektif_kontrak' => '2022-06-30',
                'jenis_kontrak' => '',
                'jangka_waktu_bulan' => 60,
                'jumlah_tenaga_kerja_sesuai_kontrak_fix_cost' => 147,
                'realisasi_di_lapangan' => 121,
                'nilai_kontrak_inc_ppn' => 10000000,
                'akhir_kontrak' => '2027-07-31',
                'status_sisa_jangka_waktu_kontrak_bulan' => 36,
                'keterangan' => '',
            ],
            [
                'category' => 'DISTRIBUSI',
                'nama_pekerjaan' => 'YANTEK MMU',
                'alat_kerja' => [
                    'total_alat_kerja' => 20,
                    'kritis' => 3,
                    'normal' => 15,
                    'kronis' => 2,
                ],
                'tanggal_efektif_kontrak' => '2023-04-17',
                'jenis_kontrak' => '',
                'jangka_waktu_bulan' => 60,
                'jumlah_tenaga_kerja_sesuai_kontrak_fix_cost' => 772,
                'realisasi_di_lapangan' => 772,
                'nilai_kontrak_inc_ppn' => 10000000,
                'akhir_kontrak' => '2028-04-30',
                'status_sisa_jangka_waktu_kontrak_bulan' => 45,
                'keterangan' => '',
            ],
            [
                'category' => 'PELAYANAN PELANGGAN',
                'nama_pekerjaan' => 'BILLMAN MMU',
                'alat_kerja' => [
                    'total_alat_kerja' => 12,
                    'kritis' => 1,
                    'normal' => 9,
                    'kronis' => 2,
                ],
                'tanggal_efektif_kontrak' => '2021-06-08',
                'jenis_kontrak' => 'Volume Based Per Juni 2023',
                'jangka_waktu_bulan' => 60,
                'jumlah_tenaga_kerja_sesuai_kontrak_fix_cost' => 355,
                'realisasi_di_lapangan' => 355,
                'nilai_kontrak_inc_ppn' => 10000000,
                'akhir_kontrak' => '2028-06-30',
                'status_sisa_jangka_waktu_kontrak_bulan' => 47,
                'keterangan' => '',
            ],
            [
                'category' => 'TRANSMISI',
                'nama_pekerjaan' => 'OPGI UIW MMU',
                'alat_kerja' => [
                    'total_alat_kerja' => 15,
                    'kritis' => 1,
                    'normal' => 10,
                    'kronis' => 4,
                ],
                'tanggal_efektif_kontrak' => '2023-04-17',
                'jenis_kontrak' => '',
                'jangka_waktu_bulan' => 60,
                'jumlah_tenaga_kerja_sesuai_kontrak_fix_cost' => 26,
                'realisasi_di_lapangan' => 26,
                'nilai_kontrak_inc_ppn' => 10000000,
                'akhir_kontrak' => '2028-04-30',
                'status_sisa_jangka_waktu_kontrak_bulan' => 45,
                'keterangan' => '',
            ],
            [
                'category' => 'AIL DOWNLOADER',
                'nama_pekerjaan' => 'MANAJEMEN AIL',
                'alat_kerja' => [
                    'total_alat_kerja' => 7,
                    'kritis' => 0,
                    'normal' => 5,
                    'kronis' => 2,
                ],
                'tanggal_efektif_kontrak' => '2023-07-25',
                'jenis_kontrak' => 'Volume Based',
                'jangka_waktu_bulan' => 12,
                'jumlah_tenaga_kerja_sesuai_kontrak_fix_cost' => 58,
                'realisasi_di_lapangan' => 58,
                'nilai_kontrak_inc_ppn' => 10000000,
                'akhir_kontrak' => '2024-08-25',
                'status_sisa_jangka_waktu_kontrak_bulan' => 1,
                'keterangan' => '',
            ]
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }

    }
}
