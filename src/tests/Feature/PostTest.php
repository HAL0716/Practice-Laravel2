<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PostTest extends TestCase
{
    use RefreshDatabase;

    public function test_posts_can_be_rendered(): void
    {
        $user = User::factory()->create();

        $this
            ->actingAs($user)
            ->get(route('posts'))
            ->assertOk();
    }

    public function test_post_can_be_created(): void
    {
        $user = User::factory()->create();

        $this
            ->actingAs($user)
            ->from(route('posts'))
            ->post(route('posts.store'), [
                'body' => 'This is a test post.',
            ])
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('posts'));

        $this->assertDatabaseHas('posts', [
            'body' => 'This is a test post.',
            'user_id' => $user->id,
        ]);
    }

    public function test_post_can_be_updated(): void
    {
        $user = User::factory()->create();
        $post = $user->posts()->create([
            'body' => 'This is a test post.',
        ]);

        $this
            ->actingAs($user)
            ->from(route('posts'))
            ->patch(route('posts.update', $post), [
                'body' => 'This is an updated test post.',
            ])
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('posts'));

        $this->assertDatabaseHas('posts', [
            'id' => $post->id,
            'body' => 'This is an updated test post.',
        ]);
    }

    public function test_post_cannot_update_with_different_user(): void
    {
        $user = User::factory()->create();
        $post = $user->posts()->create([
            'body' => 'This is a test post.',
        ]);

        $otherUser = User::factory()->create();

        $this
            ->actingAs($otherUser)
            ->from(route('posts'))
            ->patch(route('posts.update', $post), [
                'body' => 'This is an updated test post.',
            ])
            ->assertStatus(403);

        $this->assertDatabaseHas('posts', [
            'id' => $post->id,
            'body' => 'This is a test post.',
        ]);
    }

    public function test_post_can_be_deleted(): void
    {
        $user = User::factory()->create();
        $post = $user->posts()->create([
            'body' => 'This is a test post.',
        ]);

        $this
            ->actingAs($user)
            ->from(route('posts'))
            ->delete(route('posts.destroy', $post))
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('posts'));

        $this->assertDatabaseMissing('posts', [
            'id' => $post->id,
        ]);
    }

    public function test_post_cannot_delete_with_different_user(): void
    {
        $user = User::factory()->create();
        $post = $user->posts()->create([
            'body' => 'This is a test post.',
        ]);

        $otherUser = User::factory()->create();

        $this
            ->actingAs($otherUser)
            ->from(route('posts'))
            ->delete(route('posts.destroy', $post))
            ->assertStatus(403);

        $this->assertDatabaseHas('posts', [
            'id' => $post->id,
        ]);
    }
}
