<?php

namespace App\Http\Controllers\Admin\Monitoring\DetailTenagaKerja;

use App\Http\Controllers\Controller;
use App\Models\TenagaKerja;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DetailTenagaKerjaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $tenagakerja = Tenagakerja::with('project', 'documents')->find($id);

        if ($tenagakerja) {
            // Hitung usia berdasarkan tanggal lahir hingga hari ini
            $tanggal_lahir = Carbon::parse($tenagakerja->tanggal_lahir);

            // Hitung usia dalam tahun
            $usia = $tanggal_lahir->diff(Carbon::now())->y;

            // Usia pensiun, misalnya 56 tahun
            $usia_pensiun = 56;

            // Hitung target pensiun berdasarkan usia pensiun
            $target_pensiun = $tanggal_lahir->copy()->addYears($usia_pensiun);

            // Hitung selisih antara tanggal hari ini dengan target pensiun
            $selisih = Carbon::now()->diff($target_pensiun);

            // Menghitung total bulan dari tahun dan bulan yang tersisa
            // Jika telah melewati usia pensiun, `diff` akan menghasilkan tahun dan bulan positif
            // Untuk mendapatkan hasil minus, kurangi total bulan dengan tanda minus
            $sisa_bulan_total = Carbon::now()->greaterThan($target_pensiun)
                ? -1 * (($selisih->y * 12) + $selisih->m) // Negatif jika lebih dari usia pensiun
                : ($selisih->y * 12) + $selisih->m;

            // Update kolom usia dan sisa masa pensiun (dalam bentuk bulan sebagai integer)
            $tenagakerja->update([
                'usia' => $usia,
                'sisa_masa_pensiun' => $sisa_bulan_total, // simpan dalam integer (bulan)
            ]);
        }

        return Inertia::render('Admin/Monitoring/TenagaKerja/Detail/DetailTenagaKerja', [
            'tenagakerja' => $tenagakerja,
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
