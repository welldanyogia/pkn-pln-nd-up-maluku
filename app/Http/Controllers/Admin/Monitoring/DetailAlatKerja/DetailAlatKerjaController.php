<?php

namespace App\Http\Controllers\Admin\Monitoring\DetailAlatKerja;

use App\Http\Controllers\Admin\Monitoring\AlatKerjaController;
use App\Http\Controllers\Controller;
use App\Models\AlatKerja;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DetailAlatKerjaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $tool = AlatKerja::with('project')->find($id);

        return Inertia::render('Admin/Monitoring/AlatKerja/Detail/DetailAlatKerja', [
            'tool' => $tool
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
