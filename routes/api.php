<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UtilisateurController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\InviteController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\AuthController;


Route::get('/test-api', function () {
    return response()->json(['message' => 'API is working!']);
});

// 🔓 Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::apiResource('events', EventController::class)->only(['index', 'show']);


// 🔐 Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Utilisateurs (except registration)
    Route::apiResource('utilisateurs', UtilisateurController::class)->except(['store']);

    // Events (except public listing)
    Route::apiResource('events', EventController::class)->except(['index', 'show']);

    // Services
    Route::apiResource('services', ServiceController::class)->except(['show', 'update']);

    // Reservations
    Route::apiResource('reservations', ReservationController::class)->except(['update']);
    Route::get('utilisateurs/{utilisateurId}/reservations', [ReservationController::class, 'myReservations']);
    Route::get('events/{eventId}/reservations', [ReservationController::class, 'getEventReservations']);

    // Invites
    Route::prefix('invites')->group(function () {
        Route::get('{token}', [InviteController::class, 'showByToken']);
        Route::put('{token}/status', [InviteController::class, 'updateStatus']);
    });
});