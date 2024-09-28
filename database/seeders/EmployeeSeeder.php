<?php

namespace Database\Seeders;

use App\Models\TenagaKerja;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = [
            [
                'unit_pln' => 'PT. PLN (PERSERO) UP3 AMBON',
                'penempatan' => 'KANTOR PLNT AREA MALUKU (BLM)',
                'no_spk' => '0003.Pj/DAN.01.02/PLNT010000/2021',
                'nip' => '7517100ABN',
                'nama' => 'JUBAIR PAIHALY',
                'jabatan' => 'SUPERVISOR',
                'tempat_lahir' => 'Ambon',
                'tanggal_lahir' => '1985-03-15',
            ],
            [
                'unit_pln' => 'PT. PLN (PERSERO) UP3 AMBON',
                'penempatan' => 'ULP AMBON KOTA (BLM)',
                'no_spk' => '0003.Pj/DAN.01.02/PLNT010000/2021',
                'nip' => '6917110ABN',
                'nama' => 'AYLAND RAYMOND LATUMAHINA',
                'jabatan' => 'BILLER',
                'tempat_lahir' => 'Ambon',
                'tanggal_lahir' => '1990-07-10',
            ],
            [
                'unit_pln' => 'PT. PLN (PERSERO) UP3 AMBON',
                'penempatan' => 'ULP AMBON KOTA (BLM)',
                'no_spk' => '0003.PJ/DAN.01.02/PLNT010000/2021',
                'nip' => '7217150ABN',
                'nama' => 'NICOLAUS SILIK',
                'jabatan' => 'ADMIN BILLMAN',
                'tempat_lahir' => 'Ambon',
                'tanggal_lahir' => '1988-12-05',
            ],
            // Add more employee data as needed
        ];

        // Loop through the 4 project IDs (1-4)
        for ($projectId = 1; $projectId <= 4; $projectId++) {
            foreach ($employees as $employeeData) {
                TenagaKerja::create(array_merge($employeeData, [
                    'id' => (string) Str::uuid(), // Generate a UUID
                    'project_id' => $projectId,   // Assign the project ID
                ]));
            }
        }
    }
}
