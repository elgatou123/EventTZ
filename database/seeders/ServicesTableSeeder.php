<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServicesTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('services')->insert([
            ['name' => 'Catering', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Photography', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Music', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Decoration', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}