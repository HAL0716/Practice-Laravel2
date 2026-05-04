<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\DeleteRequest;
use App\Http\Requests\Auth\UpdateRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function index() : Response
    {
        return Inertia::render('Auth/Profile');
    }

    public function update(UpdateRequest $request)
    {
        $validated = $request->validated();

        $user = $request->user();

        $user->name = $validated['name'];
        $user->email = $validated['email'];

        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return back();
    }

    public function destroy(DeleteRequest $request)
    {
        $user = $request->user();

        if (!Hash::check($request->password, $user->password)) {
            return back()->withErrors([
                'password' => 'パスワードが違います',
            ]);
        }

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->to('/');
    }
}
