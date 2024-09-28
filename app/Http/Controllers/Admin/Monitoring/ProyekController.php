<?php

namespace App\Http\Controllers\Admin\Monitoring;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Project;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProyekController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $category = Category::all();
        $projects = Project::with('alatkerjas')->get()->map(function ($project) {
            // Cek jika ada perubahan hari dan update status_sisa_jangka_waktu_kontrak_bulan
            $currentDate = Carbon::now();
            $akhirKontrak = Carbon::parse($project->akhir_kontrak);

            // Jika akhir kontrak sudah lewat, set sisa bulan menjadi 0
            if ($currentDate->greaterThan($akhirKontrak)) {
                $project->status_sisa_jangka_waktu_kontrak_bulan = 0;
            } else {
                // Hitung perbedaan dalam bulan dan bulatkan
                $monthsLeft = round($currentDate->diffInMonths($akhirKontrak));
                $project->status_sisa_jangka_waktu_kontrak_bulan = $monthsLeft;
            }

            // Simpan perubahan jika ada perbedaan dengan data sebelumnya
            if ($project->isDirty('status_sisa_jangka_waktu_kontrak_bulan')) {
                $project->save();
            }

            // Format tanggal dengan Carbon
            $project->tanggal_efektif_kontrak = Carbon::parse($project->tanggal_efektif_kontrak)->format('d-m-Y');
            $project->akhir_kontrak = Carbon::parse($project->akhir_kontrak)->format('d-m-Y');
            $project->created_at = Carbon::parse($project->created_at)->format('d-m-Y');
            $project->updated_at = Carbon::parse($project->updated_at)->format('d-m-Y');

            // Tambahkan nama kategori
            $project->category_name = $project->category ? $project->category->label : null;

            // Ambil data alatkerja terkait
            $project->alatkerjas = $project->alatkerjas->map(function ($alatkerja) {
                return [
                    'id' => $alatkerja->id,
                    'nama_alat' => $alatkerja->nama_alat,
                    'tanggal_kontrak' => Carbon::parse($alatkerja->tanggal_kontrak)->format('d-m-Y'),
                    'sisa_jangka_waktu' => $alatkerja->sisa_jangka_waktu,
                    'keterangan' => $alatkerja->keterangan,
                    'catatan' => $alatkerja->catatan,
                ];
            });

            // Kelompokkan dan hitung alat kerja berdasarkan keterangan
            $project->alatkerja_summary = $project->alatkerjas->groupBy('keterangan')->map(function ($group, $keterangan) {
                return [
                    'keterangan' => $keterangan,
                    'count' => $group->count(),
                ];
            })->values();

            return $project;
        });

        $total_project = $projects->count();

        $projects_by_category = $projects->groupBy('category_id')->map(function ($group, $category_id) {
            $first_project = $group->first();
            return [
                'id' => $category_id,
                'label' => $first_project->category ? $first_project->category->label : 'Unknown',
                'count' => $group->count(),
            ];
        })->values();

        return Inertia::render('Admin/Monitoring/Proyek/Dashboard', [
            'projects' => $projects,
            'total_project' => $total_project,
            'projects_by_category' => $projects_by_category,
            'category' => $category,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    public function storeCategory(Request $request)
    {
        $request->validate([
            'label' => 'required|string|max:255',
        ]);

        $value = strtolower(str_replace(' ', '_', $request->label));

        $category = Category::create([
            'label' => $request->label,
            'value' => $value,
        ]);

        // Return the newly created category as a response
        return response()->json($category, 201);
    }

    public function getCategory()
    {
        $category = Category::all();
        return response()->json($category, 200);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate incoming request
        $request->validate([
            'nama_pekerjaan' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'tanggal_efektif_kontrak' => 'required|date',
            'jenis_kontrak' => 'required|string|max:255',
            'jangka_waktu_bulan' => 'required|integer|min:1',
            'jumlah_tenaga_kerja_sesuai_kontrak_fix_cost' => 'required|integer|min:0',
            'realisasi_di_lapangan' => 'required|integer|min:0',
            'nilai_kontrak_inc_ppn' => 'required|integer|min:0',
            'akhir_kontrak' => 'required|date',
            'status_sisa_jangka_waktu_kontrak_bulan' => 'required|integer|min:0',
            'keterangan' => 'nullable|string|max:500',
        ]);

        // Check for existing project with the same attributes
        $existingProject = Project::where('nama_pekerjaan', $request->nama_pekerjaan)
            ->where('category_id', $request->category_id)
            ->where('tanggal_efektif_kontrak', $request->tanggal_efektif_kontrak)
            ->first();

        if ($existingProject) {
            // Redirect back with an error message if the project already exists
            return redirect()->back()->with('error', 'Project with the same details already exists.');
        }

        // Create new project
        $project = Project::create([
            'nama_pekerjaan' => $request->nama_pekerjaan,
            'category_id' => $request->category_id,
            'tanggal_efektif_kontrak' => $request->tanggal_efektif_kontrak,
            'jenis_kontrak' => $request->jenis_kontrak,
            'jangka_waktu_bulan' => $request->jangka_waktu_bulan,
            'jumlah_tenaga_kerja_sesuai_kontrak_fix_cost' => $request->jumlah_tenaga_kerja_sesuai_kontrak_fix_cost,
            'realisasi_di_lapangan' => $request->realisasi_di_lapangan,
            'nilai_kontrak_inc_ppn' => $request->nilai_kontrak_inc_ppn,
            'akhir_kontrak' => $request->akhir_kontrak,
            'status_sisa_jangka_waktu_kontrak_bulan' => $request->status_sisa_jangka_waktu_kontrak_bulan,
            'keterangan' => $request->keterangan,
        ]);

        // Redirect back with a success message
        return redirect()->back()->with('success', 'Project added successfully!');
    }



    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Find the project by ID
        $project = Project::find($id);

        if (!$project) {
            // Redirect back with an error message if project not found
            return redirect()->route('proyek.index')->with('error', 'Project not found.');
        }

        // Format the date fields using Carbon
        $project->tanggal_efektif_kontrak = Carbon::parse($project->tanggal_efektif_kontrak)->format('d-m-Y');
        $project->akhir_kontrak = Carbon::parse($project->akhir_kontrak)->format('d-m-Y');
        $project->created_at = Carbon::parse($project->created_at)->format('d-m-Y');
        $project->updated_at = Carbon::parse($project->updated_at)->format('d-m-Y');

        $project->category_name = $project->category ? $project->category->label : null;

        // Render the Inertia view with the project details
        return Inertia::render('Admin/Monitoring/Proyek/Show', [
            'project' => $project,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validate incoming request
//        $request->validate([
//            'nama_pekerjaan' => 'required|string|max:255',
//            'category_id' => 'required|exists:categories,id',
//            'tanggal_efektif_kontrak' => 'required|date_format:d/m/Y',
//            'jenis_kontrak' => 'required|string|max:255',
//            'jangka_waktu_bulan' => 'required|integer|min:1',
//            'jumlah_tenaga_kerja_sesuai_kontrak_fix_cost' => 'required|integer|min:0',
//            'realisasi_di_lapangan' => 'required|integer|min:0',
//            'nilai_kontrak_inc_ppn' => 'required|integer|min:0',
//            'akhir_kontrak' => 'required|date_format:d/m/Y',
//            'status_sisa_jangka_waktu_kontrak_bulan' => 'required|integer|min:0',
//            'keterangan' => 'nullable|string|max:500',
//        ]);

        // Find the project by ID
        $project = Project::find($id);

        if (!$project) {
            // Redirect back with error if project not found
            return redirect()->route('proyek.index')->with('error', 'Project not found.');
        }

        // Update the project fields
        $project->update([
            'nama_pekerjaan' => $request->nama_pekerjaan,
            'category_id' => $request->category_id,
            'tanggal_efektif_kontrak' => Carbon::createFromFormat('d/m/Y', $request->tanggal_efektif_kontrak)->format('Y-m-d'),
            'jenis_kontrak' => $request->jenis_kontrak,
            'jangka_waktu_bulan' => $request->jangka_waktu_bulan,
            'jumlah_tenaga_kerja_sesuai_kontrak_fix_cost' => $request->jumlah_tenaga_kerja_sesuai_kontrak_fix_cost,
            'realisasi_di_lapangan' => $request->realisasi_di_lapangan,
            'nilai_kontrak_inc_ppn' => $request->nilai_kontrak_inc_ppn,
            'akhir_kontrak' => Carbon::createFromFormat('d/m/Y', $request->akhir_kontrak)->format('Y-m-d'),
            'status_sisa_jangka_waktu_kontrak_bulan' => $request->status_sisa_jangka_waktu_kontrak_bulan,
            'keterangan' => $request->keterangan,
        ]);

        // Redirect back to the project index with a success message
        return redirect()->route('proyek.index')->with('success', 'Project updated successfully!');
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Find the project by ID
        $project = Project::find($id);

        if (!$project) {
            // Redirect back with error if project not found
            return redirect()->back()->with('error', 'Project not found.');
        }

        // Delete project
        $project->delete();

        // Redirect back with success message
        return redirect()->route('proyek.index')->with('success', 'Project deleted successfully.');
    }
}
