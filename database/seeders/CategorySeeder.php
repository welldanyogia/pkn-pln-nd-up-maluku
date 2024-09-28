<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['label' => 'PEMBANGKIT', 'value' => 'pembangkit'],
            ['label' => 'DISTRIBUSI', 'value' => 'distribusi'],
            ['label' => 'PELAYANAN PELANGGAN', 'value' => 'pelayanan pelanggan'],
            ['label' => 'TRANSMISI', 'value' => 'transmisi'],
            ['label' => 'AIL DOWNLOADER', 'value' => 'AIL DOWNLOADER'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
