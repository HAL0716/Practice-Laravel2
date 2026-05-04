<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class ProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_profile_page_can_be_rendered(): void
    {
        $user = User::factory()->create();

        $this
            ->actingAs($user)
            ->get(route('profile'))
            ->assertOk();
    }

    public function test_user_can_update_profile_without_password(): void
    {
        $user = User::factory()->create();

        $this
            ->actingAs($user)
            ->patch(route('profile.update'), [
                'name' => 'Updated Name',
                'email' => 'updated@example.com',
                'password' => '',
                'password_confirmation' => '',
            ])
            ->assertSessionHasNoErrors()
            ->assertRedirect('/');

        $user->refresh();

        $this->assertEquals('Updated Name', $user->name);
        $this->assertEquals('updated@example.com', $user->email);
    }

    public function test_user_can_update_profile_with_password(): void
    {
        $user = User::factory()->create();

        $this
            ->actingAs($user)
            ->patch(route('profile.update'), [
                'name' => 'Updated Name',
                'email' => 'updated@example.com',
                'password' => 'new-password',
                'password_confirmation' => 'new-password',
            ])
            ->assertSessionHasNoErrors()
            ->assertRedirect('/');

        $user->refresh();

        $this->assertTrue(Hash::check('new-password', $user->password));
    }

    public function test_user_can_delete_account_with_correct_password(): void
    {
        $user = User::factory()->create([
            'password' => bcrypt('password'),
        ]);

        $this
            ->actingAs($user)
            ->delete(route('profile.destroy'), [
                'password' => 'password',
            ])
            ->assertRedirect('/');

        $this->assertDatabaseMissing('users', [
            'id' => $user->id,
        ]);

        $this->assertGuest();
    }

    public function test_user_cannot_delete_account_with_wrong_password(): void
    {
        $user = User::factory()->create([
            'password' => bcrypt('password'),
        ]);

        $this
            ->actingAs($user)
            ->delete('/profile', [
                'password' => 'wrong-password',
            ])
            ->assertSessionHasErrors(['password']);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
        ]);

        $this->assertAuthenticatedAs($user);
    }
}
