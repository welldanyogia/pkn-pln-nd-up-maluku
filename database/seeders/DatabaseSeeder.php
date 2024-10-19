<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

//        User::factory()->create([
//            'name' => 'Test User',
//            'email' => 'test@example.com',
//        ]);
//        User::create([
//            'name' => 'Super Admin',
//            'username' => 'SuperAdmin',
//            'email' => 'superadmin@superadmin.com',
//            'password' => bcrypt('12341234'), // Jangan lupa untuk mengganti password ini
//            'role' => 'superadmin',
//        ]);

        // Seed admin
        User::create([
            'name' => 'Admin',
            'username' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('12341234'), // Jangan lupa untuk mengganti password ini
            'role' => 'admin',
        ]);

//        $this->call(ProjectSeeder::class);
    }
}
