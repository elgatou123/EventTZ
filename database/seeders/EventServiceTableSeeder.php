<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventServiceTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('event_service')->insert([
            ['event_id' => 1, 'service_id' => 1],
            ['event_id' => 1, 'service_id' => 2],
            ['event_id' => 1, 'service_id' => 3],
            ['event_id' => 2, 'service_id' => 1],
            ['event_id' => 2, 'service_id' => 4],
        ]);
    }
}