<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Invite;

class ReservationController extends Controller
{
    public function index() {
        return Reservation::with('utilisateur', 'event')->get();
    }

    public function store(Request $request) {
        $reservation = Reservation::create($request->all());

        // Create Invite
        $invite = Invite::create([
            'reservation_id' => $reservation->id,
            'token' => Str::uuid(),
        ]);

        return [
            'reservation' => $reservation,
            'invite_link' => url('/invite/' . $invite->token),
        ];
    }

    public function myReservations($userId) {
        return Reservation::with('event', 'invite')
            ->where('user_id', $userId)
            ->get();
    }

    public function getEventReservations($eventId) {
        return Reservation::with(['utilisateur', 'invite'])
            ->where('event_id', $eventId)
            ->get();
    }
}
