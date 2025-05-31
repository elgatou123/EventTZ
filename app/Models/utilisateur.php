<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;        // For notifications like password reset etc.
use Laravel\Sanctum\HasApiTokens;              // For API token authentication (if using Sanctum)

class Utilisateur extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    // Table name (optional if your table name is 'utilisateurs')
    protected $table = 'utilisateurs';

    // Which attributes can be mass assigned
    protected $fillable = [
        'name',
        'email',
        'password',    // Add password here if you want to create/update users with password
        'role',
    ];

    // Hide sensitive fields when returning user data as JSON
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Casts (to handle types)
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function events()
    {
        return $this->hasMany(Event::class, 'organizer_id');
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
