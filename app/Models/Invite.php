<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Invite extends Model
{
    use HasFactory;

    protected $fillable = ['reservation_id', 'token', 'status'];

    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }
}
