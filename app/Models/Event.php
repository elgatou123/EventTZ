<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{
    use HasFactory;

protected $fillable = [
    'title',
    'description',
    'type',
    'location',
    'organizer_id',
    'image',
    'available_spots',
];



    public function organizer()
    {
        return $this->belongsTo(Utilisateur::class, 'organizer_id');
    }

    public function services()
    {
        return $this->belongsToMany(Service::class, 'event_service');
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
