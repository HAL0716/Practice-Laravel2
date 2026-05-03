<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function index(Request $request) : Response
    {
        return Inertia::render('Auth/Profile', [
            'user' => $request->user(),
        ]);
    }
}
