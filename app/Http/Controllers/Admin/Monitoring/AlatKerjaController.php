<?php

namespace App\Http\Controllers\Admin\Monitoring;

use App\Http\Controllers\Controller;
use App\Models\AlatKerja;
use App\Models\Project;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlatKerjaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Ambil semua data alat kerja dengan relasi project
        $tools = AlatKerja::with('project')->get();

        // Inisialisasi array untuk menghitung jumlah alat kerja berdasarkan keterangan
        $countKeterangan = [
            'Normal' => 0,
            'Kritis' => 0,
            'Kronis' => 0,
        ];

        // Loop untuk menghitung 'masa_pakai_saat_ini', 'sisa_masa_pakai', dan mengupdate 'keterangan'
        foreach ($tools as $tool) {
            // Hitung masa_pakai_saat_ini (dalam bulan) dan bulatkan
            $tglKontrak = Carbon::parse($tool->tgl_kontrak);
            $hariIni = Carbon::now();
            $masaPakaiSaatIni = round($tglKontrak->diffInMonths($hariIni)); // Perbedaan dalam bulan dan bulatkan

            // Update masa_pakai_saat_ini
            $tool->masa_pakai_saat_ini = $masaPakaiSaatIni;

            // Hitung sisa masa pakai
            $sisaMasaPakai = $tool->masa_pakai - $masaPakaiSaatIni;
//
//            $tglAkhirKontrak = $tglKontrak->addMonths($tool->masa_pakai);
//            $tool->tgl_akhir_kontrak = $tglAkhirKontrak;
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

        // Ambil semua project untuk dropdown atau filter
        $projects = Project::select('id', 'nama_pekerjaan')->get();

        // Render tampilan menggunakan Inertia
        return Inertia::render('Admin/Monitoring/AlatKerja/Dashboard', [
            'tools' => $tools,
            'projects' => $projects,
            'countKeterangan' => $countKeterangan, // Kirim jumlah alat kerja berdasarkan keterangan
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validasi data yang diterima
        $validatedData = $request->validate([
            'nama_alat' => 'required|string|max:255',
            'project_id' => 'required|integer|exists:projects,id',
            'tgl_kontrak' => 'required|date',
            'masa_pakai' => 'required|integer',
            'masa_pakai_saat_ini' => 'nullable|integer',
            'sisa_masa_pakai' => 'nullable|integer',
            'keterangan' => 'nullable|string|max:255',
        ]);

        try {
            // Hitung tgl_akhir_kontrak berdasarkan tgl_kontrak + masa_pakai (dalam satuan bulan misalnya)
            $tgl_akhir_kontrak = Carbon::parse($validatedData['tgl_kontrak'])
                ->addMonths((int)$validatedData['masa_pakai']);

            // Tambahkan tgl_akhir_kontrak ke data yang akan disimpan
            $validatedData['tgl_akhir_kontrak'] = $tgl_akhir_kontrak;

            // Buat instance AlatKerja baru dan isi dengan data yang sudah divalidasi
            AlatKerja::create($validatedData);

            // Redirect atau kembalikan respon
            return redirect()->back()->with('success', 'Data alat kerja berhasil ditambahkan');
        } catch (\Exception $e) {
            // Tangani error
            return redirect()->back()->with('error', 'Terjadi kesalahan saat menambahkan data');
        }
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
        // Validate the incoming data
        $validatedData = $request->validate([
            'nama_alat' => 'required|string|max:255',
            'project_id' => 'required|integer|exists:projects,id',
            'tgl_kontrak' => 'required|date',
            'masa_pakai' => 'required|integer',
            'masa_pakai_saat_ini' => 'nullable|integer',
            'sisa_masa_pakai' => 'nullable|integer',
            'keterangan' => 'nullable|string|max:255',
        ]);

        try {
            // Find the specific tool by ID and update its data
            $alatKerja = AlatKerja::findOrFail($id);
            $alatKerja->update($validatedData);

            // Redirect or return response
            return redirect()->back()->with('success', 'Data alat kerja berhasil diperbarui');
        } catch (\Exception $e) {
            // Handle error
            return redirect()->back()->with('error', 'Terjadi kesalahan saat memperbarui data');
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tool = AlatKerja::find($id);

        if (!$tool) {
            // Redirect back with error if project not found
            return redirect()->back()->with('error', 'Tool not found.');
        }

        // Delete project
        $tool->delete();

        // Redirect back with success message
        return redirect()->route('alatkerja.index')->with('success', 'Tool deleted successfully.');
    }
}
