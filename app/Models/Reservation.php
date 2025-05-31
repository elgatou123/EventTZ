<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reservation extends Model
{
    use HasFactory;
    protected $fillable = ['user_id','date_time', 'event_id'];

    public function user()
    {
        return $this->belongsTo(Utilisateur::class);
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function invite()
    {
        return $this->hasOne(Invite::class);
    }
}
