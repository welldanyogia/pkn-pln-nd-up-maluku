<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Project;
use App\Models\TenagaKerja;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $projects = Project::all()->map(function ($project) {
            // Format the date fields using Carbon
            $project->tanggal_efektif_kontrak = Carbon::parse($project->tanggal_efektif_kontrak)->format('d-m-Y');
            $project->akhir_kontrak = Carbon::parse($project->akhir_kontrak)->format('d-m-Y');
            $project->created_at = Carbon::parse($project->created_at)->format('d-m-Y');
            $project->updated_at = Carbon::parse($project->updated_at)->format('d-m-Y');

            $project->category_name = $project->category ? $project->category->label : null;
            return $project;
        });
        $total_project = $projects->count();
        $category = Category::all();
        $total_tenagakerja = Tenagakerja::all()->count();

        return Inertia::render('Admin/Dashboard', [
            'projects' => $projects,
            'total_project' => $total_project,
            'category' => $category,
            'total_tenagakerja' => $total_tenagakerja,
        ]);
    }
}
