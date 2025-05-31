<?php
namespace App\Http\Controllers;

use App\Models\Invite;
use Illuminate\Http\Request;

class InviteController extends Controller
{
    public function showByToken($token) {
        return Invite::with('reservation.event')->where('token', $token)->firstOrFail();
    }

    public function updateStatus(Request $request, $token) {
        $invite = Invite::where('token', $token)->firstOrFail();
        $invite->status = $request->status; // "confirmed", "declined", etc.
        $invite->save();

        return response()->json(['message' => 'Status updated.']);
    }
}
