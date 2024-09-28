<?php

namespace App\Http\Controllers\Admin\Monitoring;

use App\Http\Controllers\Controller;
use App\Models\AlatKerja;
use App\Models\Document;
use App\Models\Project;
use App\Models\TenagaKerja;
use Google\Cloud\Storage\StorageClient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TenagaKerjaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employees = TenagaKerja::with('project','documents')->get();
        $projects = Project::all();
        return Inertia::render('Admin/Monitoring/TenagaKerja/Dashboard', [
            'employees' => $employees,
            'projects' => $projects
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validasi input dari form
        $validatedData = $request->validate([
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'nip' => 'required|string|max:255|unique:tenaga_kerjas,nip', // NIP harus unik
            'tempat_lahir' => 'required|string|max:255',
            'tgl_lahir' => 'required|date',
            'project_id' => 'required|exists:projects,id', // Pastikan project_id valid
            'unit_pln' => 'nullable|string|max:255',
            'penempatan' => 'nullable|string|max:255',
            'no_spk' => 'nullable|string|max:255',
        ]);

        // Simpan data baru ke database
        TenagaKerja::create([
            'nama' => $validatedData['nama'],
            'jabatan' => $validatedData['jabatan'],
            'nip' => $validatedData['nip'],
            'tempat_lahir' => $validatedData['tempat_lahir'],
            'tanggal_lahir' => $validatedData['tgl_lahir'],
            'project_id' => $validatedData['project_id'],
            'unit_pln' => $validatedData['unit_pln'],
            'penempatan' => $validatedData['penempatan'],
            'no_spk' => $validatedData['no_spk'],
        ]);

        // Redirect dengan pesan sukses
        return redirect()->route('tenagakerja.index')->with('success', 'Tenaga kerja berhasil ditambahkan.');
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
        // Logging input request
        Log::info('Update Tenaga Kerja - Request Data:', $request->all());
        Log::info('ID Tenaga Kerja - Request Data:', ['id' => $id]);

        try {
            // Temukan tenaga kerja yang ingin diupdate
            $employee = TenagaKerja::findOrFail($id);
            Log::info('Update Tenaga Kerja - Employee Found:', ['id' => $id, 'employee' => $employee]);

            // Update data tenaga kerja tanpa validasi
            $employee->update([
                'nama' => $request->input('nama'),
                'jabatan' => $request->input('jabatan'),
                'nip' => $request->input('nip'),
                'tempat_lahir' => $request->input('tempat_lahir'),
                'tanggal_lahir' => $request->input('tgl_lahir'),
                'project_id' => $request->input('project_id'),
                'unit_pln' => $request->input('unit_pln'),
                'penempatan' => $request->input('penempatan'),
                'no_spk' => $request->input('no_spk'),
            ]);

            Log::info('Update Tenaga Kerja - Update Success:', ['id' => $id, 'data' => $request->all()]);

            // Redirect dengan pesan sukses
            return redirect()->route('tenagakerja.index')->with('success', 'Tenaga kerja berhasil diperbarui.');
        } catch (\Exception $e) {
            Log::error('Update Tenaga Kerja - Error:', ['message' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);

            // Redirect dengan pesan error
            return redirect()->back()->with('error', 'Terjadi kesalahan saat memperbarui tenaga kerja.');
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $employee = TenagaKerja::find($id);

        if (!$employee) {
            // Redirect back with error if project not found
            return redirect()->back()->with('error', 'Tool not found.');
        }

        // Delete project
        $employee->delete();

        // Redirect back with success message
        return redirect()->route('tenagakerja.index')->with('success', 'Tool deleted successfully.');
    }

    public function documentUpload(Request $request)
    {
        try {
            Log::info("Entering documentUpload method.");

            // Log semua input dari request
            Log::info("Request data: ", $request->all());

            // Validate the incoming request data
            $request->validate([
                'file' => 'required|mimes:pdf|max:2048', // Validate only PDFs up to 2MB
                'tenaga_kerja_id' => 'required|exists:tenaga_kerjas,id',
            ]);

            Log::info("Validation passed.");

            // Find the TenagaKerja instance
            $tenagaKerja = TenagaKerja::findOrFail($request->input('tenaga_kerja_id'));
            Log::info("Found TenagaKerja: ", ['id' => $tenagaKerja->id, 'name' => $tenagaKerja->nama]);

            // Create a file name based on the worker's name
            $fileName = str_replace(' ', '_', $tenagaKerja->nama) . '-' . time() . '.pdf'; // Replace spaces with underscores and append timestamp
            $filePath = $request->file('file')->storeAs('documents', $fileName, 'public');
            Log::info("File stored successfully: ", ['file_name' => $fileName, 'file_path' => $filePath]);

            // Create the document entry in the database
            Document::create([
                'tenaga_kerja_id' => $tenagaKerja->id,
                'file_name' => $fileName,
                'file_path' => $filePath,
            ]);

            Log::info("Document entry created successfully.");

            return response()->json(['message' => 'File uploaded successfully', 'file' => $fileName]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error("Validation failed: ", $e->validator->errors()->toArray());
            return response()->json(['errors' => $e->validator->errors()], 422);
        } catch (\Exception $e) {
            Log::error("An error occurred: " . $e->getMessage());
            return response()->json(['error' => 'An error occurred while uploading the file.'], 500);
        }
    }

    public function documentUploadGCS(Request $request)
    {
        try {
            Log::info("Entering documentUploadGCS method.");

            // Log all input from the request
            Log::info("Request data: ", $request->all());

            // Validate the incoming request data
            $request->validate([
                'file' => 'required|mimes:pdf|max:2048', // Validate only PDFs up to 2MB
                'tenaga_kerja_id' => 'required|exists:tenaga_kerjas,id',
            ]);

            Log::info("Validation passed.");

            // Find the TenagaKerja instance
            $tenagaKerja = TenagaKerja::findOrFail($request->input('tenaga_kerja_id'));
            Log::info("Found TenagaKerja: ", ['id' => $tenagaKerja->id, 'name' => $tenagaKerja->nama]);

            // Create a file name based on the worker's name
            $fileName = str_replace(' ', '_', $tenagaKerja->nama) . '-' . time() . '.pdf'; // Replace spaces with underscores and append timestamp
            $filePath = 'documents/' . $fileName;

            // Open a stream for the file
            $stream = fopen($request->file('file')->getRealPath(), 'r');

            // Ensure the stream is valid before writing
            if ($stream === false) {
                throw new \Exception('Unable to open stream for file upload.');
            }

            // Upload the file to Google Cloud Storage
            Storage::disk('gcs')->writeStream($filePath, $stream);
//            fclose($stream); // Close the stream after uploading

            Log::info("File uploaded to Google Cloud Storage: ", ['file_name' => $fileName, 'file_path' => $filePath]);
            $publicUrl = sprintf('https://storage.googleapis.com/%s/%s', env('GOOGLE_CLOUD_STORAGE_BUCKET'), $filePath);

            // Create the document entry in the database
            Document::create([
                'tenaga_kerja_id' => $tenagaKerja->id,
                'file_name' => $fileName,
                'file_path' => $publicUrl,
            ]);

            Log::info("Document entry created successfully.");

            // Construct the public URL for the uploaded file

            return redirect()->route('tenagakerja.index')->with('success', 'File uploaded successfully to GCS')->with('file', $fileName)->with('url', $publicUrl);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error("Validation failed: ", $e->validator->errors()->toArray());
            return redirect()->route('tenagakerja.index')->withErrors($e->validator->errors());
        } catch (\Exception $e) {
            Log::error("An error occurred: " . $e->getMessage());
            return redirect()->route('tenagakerja.index')->with('error', 'An error occurred while uploading the file.');
        }
    }




    public function uploadFile(Request $request)
    {
        // Validasi file untuk memastikan hanya PDF yang dapat diunggah
        $request->validate([
            'file' => 'required|mimes:pdf|max:2048', // maksimal 2MB
        ]);

        // Cek apakah ada file yang diunggah
        if ($request->hasFile('file')) {
            // Dapatkan file dari request
            $file = $request->file('file');

            // Tentukan nama unik untuk file
            $fileName = time() . '_' . $file->getClientOriginalName();

            // Simpan file di dalam folder storage/app/public/uploads
            $path = $file->storeAs('public/uploads', $fileName);

            // Simpan informasi file ke database jika diperlukan (opsional)
            // FileModel::create(['file_path' => $path]);

            return response()->json([
                'message' => 'File berhasil diunggah',
                'file_path' => Storage::url($path)
            ]);
        }

        return response()->json([
            'message' => 'Tidak ada file yang diunggah'
        ], 400);
    }

}
