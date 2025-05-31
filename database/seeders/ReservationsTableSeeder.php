<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReservationsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('reservations')->insert([
            [
                'utilisateurs_id' => 2,
                'event_id' => 1,
                'date_time' => '2023-08-20 20:00:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'utilisateurs_id' => 2,
                'event_id' => 2,
                'date_time' => '2023-08-20 20:00:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}