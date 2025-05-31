<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index() {
        return Event::with('services')->get();
    }

public function store(Request $request)
{
    // Validate the request
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string|min:10',
        'type' => 'required|in:wedding,birthday,party,conference,meeting,funeral,other',
        'location' => 'required|string|min:3',
        'organizer_id' => 'required|exists:utilisateurs,id',
        'services' => 'sometimes|array',
        'services.*' => 'exists:services,id',
        'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        'available_spots' => 'required|integer|min:1',
    ], [
        'services.*.exists' => 'One or more selected services do not exist',
        'organizer_id.exists' => 'The specified organizer does not exist'
    ]);

    // Handle image upload
    if ($request->hasFile('image')) {
        $path = $request->file('image')->store('public/images');
        $validated['image'] = str_replace('public', 'storage', $path);
    }

    // Create the event
    $event = Event::create($validated);

    // Attach services (many-to-many)
    if (!empty($validated['services'])) {
        $event->services()->sync($validated['services']);
    }

    return response()->json([
        'message' => 'Event created successfully',
        'event' => $event->load('services')
    ], 201);
}

    public function show($id) {
        return Event::with('services', 'organizer')->findOrFail($id);
    }

    public function update(Request $request, $id) {
        $event = Event::findOrFail($id);
        $event->update($request->all());
        if ($request->has('services')) {
            $event->services()->sync($request->services);
        }
        return $event->load('services');
    }

    public function destroy($id) {
        return Event::destroy($id);
    }
}
