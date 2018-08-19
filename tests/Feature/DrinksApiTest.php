<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DrinksApiTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
        $user = factory(\App\Model\User::class)->create(['metabolism' => 1]);
        $drink = factory(\App\Model\Drink::class)->create();

        \App\Model\Sip::create([
            'user_id'   => $user->id,
            'drink_id'  => $drink->id,
        ]);

        $this->json('GET', '/api/drinks/'.$user->id)
            ->assertStatus(401)
            ->assertJson(["message" => "Unauthenticated."]);

        $this->be($user);

    }
}
