<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_screen_can_be_rendered(): void
    {
        $this
            ->get(route('login'))
            ->assertOk();
    }

    public function test_users_can_authenticate_using_the_login_screen(): void
    {
        $user = User::factory()->create([
            'password' => bcrypt($password = 'password'),
        ]);

        $this
            ->post(route('login'), [
                'email' => $user->email,
                'password' => $password,
            ])
            ->assertRedirect(route('profile'));

        $this->assertAuthenticatedAs($user);
    }

    public function test_users_can_not_authenticate_with_invalid_password(): void
    {
        $user = User::factory()->create([
            'password' => bcrypt('password'),
        ]);

        $this
            ->from(route('login'))
            ->post(route('login'), [
                'email' => $user->email,
                'password' => 'wrong-password',
            ])
            ->assertRedirect(route('login'))
            ->assertSessionHasErrors('status');

        $this->assertGuest();
    }

    public function test_users_are_locked_out_after_five_failed_attempts(): void
    {
        $user = User::factory()->create([
            'password' => bcrypt('password'),
        ]);

        for ($i = 0; $i < 5; $i++) {
            $this->post('/login', [
                'email' => $user->email,
                'password' => 'wrong-password',
            ]);
        }

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $this->assertGuest();

        $response->assertSessionHasErrors(['status']);

        $this->assertStringContainsString(
            '秒後に再試行してください。',
            session('errors')->get('status')[0]
        );
    }

    public function test_user_cannot_login_after_rate_limit_even_with_correct_password(): void
    {
        $user = User::factory()->create([
            'password' => bcrypt('password'),
        ]);

        // 5回失敗
        for ($i = 0; $i < 5; $i++) {
            $this->post('/login', [
                'email' => $user->email,
                'password' => 'wrong-password',
            ]);
        }

        // 正しいパスワードでも弾かれる
        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $this->assertGuest();

        $response->assertSessionHasErrors([
            'status',
        ]);
    }

    public function test_users_can_logout(): void
    {
        $user = User::factory()->create();

        $this
            ->actingAs($user)
            ->post(route('logout'))
            ->assertRedirect('/');

        $this->assertGuest();
    }
}
