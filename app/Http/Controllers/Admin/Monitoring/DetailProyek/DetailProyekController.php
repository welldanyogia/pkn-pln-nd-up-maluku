<?php

namespace App\Http\Controllers\Admin\Monitoring\DetailProyek;

use App\Http\Controllers\Controller;
use App\Models\AlatKerja;
use App\Models\Project;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DetailProyekController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $project = Project::with('category','alatKerjas','employees')->find($id);

        $countKeterangan = [
            'Normal' => 0,
            'Kritis' => 0,
            'Kronis' => 0,
        ];
        foreach ($project->alatKerjas as $alatKerja) {
            if ($alatKerja->keterangan === 'Normal') {
                $countKeterangan['Normal']++;
            } elseif ($alatKerja->keterangan === 'Kritis') {
                $countKeterangan['Kritis']++;
            } elseif ($alatKerja->keterangan === 'Kronis') {
                $countKeterangan['Kronis']++;
            }
        }
        foreach ($project->alatKerjas as $tool) {
            // Hitung masa_pakai_saat_ini (dalam bulan) dan bulatkan
            $tglKontrak = Carbon::parse($tool->tgl_kontrak);
            $hariIni = Carbon::now();
            $masaPakaiSaatIni = round($tglKontrak->diffInMonths($hariIni)); // Perbedaan dalam bulan dan bulatkan

            // Update masa_pakai_saat_ini
            $tool->masa_pakai_saat_ini = $masaPakaiSaatIni;

            // Hitung sisa masa pakai
            $sisaMasaPakai = $tool->masa_pakai - $masaPakaiSaatIni;

            if ($sisaMasaPakai >= 0) {
                // Jika sisa masa pakai masih ada
                $tool->sisa_masa_pakai = $sisaMasaPakai;
            } else {
                // Jika sudah melewati masa pakai, gunakan nilai negatif
                $tool->sisa_masa_pakai = $sisaMasaPakai; // Nilai negatif untuk masa pakai yang sudah lewat
            }

            // Tentukan keterangan berdasarkan sisa masa pakai
            if ($sisaMasaPakai >= 3) {
                $tool->keterangan = 'Normal';
                $countKeterangan['Normal']++; // Tambah hitungan untuk Normal
            } elseif ($sisaMasaPakai <= 1 && $sisaMasaPakai >= 0) {
                $tool->keterangan = 'Kritis';
                $countKeterangan['Kritis']++; // Tambah hitungan untuk Kritis
            } elseif ($sisaMasaPakai < 0) {
                $tool->keterangan = 'Kronis';
                $countKeterangan['Kronis']++; // Tambah hitungan untuk Kronis
            }

            // Simpan data yang sudah di-update
            $tool->save();
        }
        return Inertia::render('Admin/Monitoring/Proyek/Detail/DetailProyek', [
            'project' => $project,
            'countKeterangan' => $countKeterangan,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
