<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class InvitesTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('invites')->insert([
            [
                'token' => Str::uuid(),
                'reservation_id' => 1,
                'status' => 'confirmed',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'token' => Str::uuid(),
                'reservation_id' => 2,
                'status' => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}