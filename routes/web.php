<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\Monitoring\AlatKerjaController;
use App\Http\Controllers\Admin\Monitoring\ProyekController;
use App\Http\Controllers\Admin\Monitoring\TenagaKerjaController;
use App\Http\Controllers\Admin\SuperAdminDashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
//    return Inertia::render('Auth/Login', [
//        'canLogin' => Route::has('login'),
//        'canRegister' => Route::has('register'),
//        'laravelVersion' => Application::VERSION,
//        'phpVersion' => PHP_VERSION,
//    ]);
    return redirect("/login");
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
//    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/dashboard', [SuperAdminDashboardController::class, 'index'])->name('superadmin.dashboard');
//    Route::get('/user/dashboard', [UserDashboardController::class, 'index'])->name('user.dashboard');
//    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard'); // Default dashboard
    Route::get('/admin/dashboard/proyek',[ProyekController::class, 'index'])->name('proyek.index');
    Route::get('/admin/dashboard/alat-kerja',[AlatKerjaController::class, 'index'])->name('alatkerja.index');
    Route::get('/admin/dashboard/tenaga-kerja',[TenagaKerjaController::class, 'index'])->name('tenagakerja.index');
});
require __DIR__.'/auth.php';
