<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $this
            ->get(route('register'))
            ->assertOk();
    }

    public function test_new_users_can_register(): void
    {
        $this
            ->post(route('register'), [
                'name' => 'Test User',
                'email' => 'test@example.com',
                'password' => $password = 'password',
                'password_confirmation' => $password,
            ])
            ->assertRedirect(route('profile'));

        $user = User::where('email', 'test@example.com')->first();

        $this->assertNotNull($user);
        $this->assertAuthenticatedAs($user);
    }

    public function test_new_users_cannot_register_with_duplicate_email(): void
    {
        User::factory()->create([
            'email' => 'test@example.com',
        ]);

        $this
            ->from(route('register'))
            ->post(route('register'), [
                'name' => 'Test User',
                'email' => 'test@example.com',
                'password' => 'password',
                'password_confirmation' => 'password',
            ])
            ->assertRedirect(route('register'))
            ->assertSessionHasErrors(['email']);

        $this->assertGuest();
    }
}
