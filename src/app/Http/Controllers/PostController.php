<?php

namespace App\Http\Controllers;

use App\Http\Requests\Post\StoreRequest;
use App\Http\Requests\Post\UpdateRequest;
use App\Models\Post;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    use AuthorizesRequests;

    public function index(): Response
    {
        return Inertia::render('Posts/Index', [
            'posts' => Post::with('user')->latest()->get()
        ]);
    }

    public function store(StoreRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        Post::create([
            'body' => $validated['body'],
        ]);

        return back();
    }

    public function update(UpdateRequest $request, Post $post): RedirectResponse
    {
        $this->authorize('update', $post);

        $validated = $request->validated();

        $post->update([
            'body' => $validated['body'],
        ]);

        return back();
    }

    public function destroy(Post $post): RedirectResponse
    {
        $this->authorize('delete', $post);

        $post->delete();

        return back();
    }
}
