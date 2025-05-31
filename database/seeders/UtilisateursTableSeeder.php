<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UtilisateursTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('utilisateurs')->insert([
            [
                'name' => 'Organizer 1',
                'email' => 'organizer5@example.com',
                'password' => Hash::make('password123'),
                'role' => 'organizer',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Guest 1',
                'email' => 'guest11@example.com',
                'password' => Hash::make('password123'),
                'role' => 'guest',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Organizer 2',
                'email' => 'organizer3@example.com',
                'password' => Hash::make('password123'),
                'role' => 'organizer',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}