<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('events')->insert([
            [
                'title' => 'Summer Wedding',
                'description' => 'Beautiful summer wedding by the beach',
                'type' => 'wedding',
                'location' => 'Beach Resort, Malibu',
                'organizer_id' => 1,
                'image' => 'http://127.0.0.1:8000/storage/images/summer_wedding.jpg', 
                'available_spots'=> 100, 
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Birthday Party',
                'description' => '30th birthday celebration',
                'type' => 'party',
                'location' => 'Downtown Club, New York',
                'organizer_id' => 3,
                'image' => 'http://127.0.0.1:8000/storage/images/birthday_party.jpg', // example image path
                'available_spots'=> 100, 
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
