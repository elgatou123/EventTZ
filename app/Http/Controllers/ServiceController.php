<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index() {
        return Service::all();
    }

    public function store(Request $request) {
        return Service::create($request->all());
    }

    public function destroy($id) {
        return Service::destroy($id);
    }
}
