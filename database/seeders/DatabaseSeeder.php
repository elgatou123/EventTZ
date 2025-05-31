<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            UtilisateursTableSeeder::class,
            EventsTableSeeder::class,
            ServicesTableSeeder::class,
            EventServiceTableSeeder::class,
            ReservationsTableSeeder::class,
            InvitesTableSeeder::class,
        ]);
    }
}