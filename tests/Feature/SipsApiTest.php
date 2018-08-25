<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class SipsApiTest extends TestCase
{
    public function testReadSips()
    {
        $user = factory(\App\Model\User::class)->create(['metabolism' => 1]);
        $drink = factory(\App\Model\Drink::class)->create();
        $drink->refresh();

        $this->json('GET', '/api/sips/')
            ->assertStatus(401)
            ->assertJson(["message" => "Unauthenticated."]);

        $this->actingAs($user);

        $this->json('GET', '/api/sips/')
            ->assertStatus(200)
            ->assertDontSee($drink)
            ->assertJsonFragment(['bcl' => 0]);

        \App\Model\Sip::create([
            'user_id'   => $user->id,
            'drink_id'  => $drink->id,
        ]);

        $this->json('GET', '/api/sips/')
            ->assertStatus(200)
            ->assertJsonFragment(['drink_id'  => $drink->id])
            ->assertJsonMissing(['bcl' => 0]);
    }

    public function testCreateSips()
    {
        $user = factory(\App\Model\User::class)->create(['metabolism' => 1]);
        $drink = factory(\App\Model\Drink::class)->create()->fresh();

        $this->actingAs($user);

        $this->json('POST', '/api/sips/', [])
            ->assertStatus(422)
            ->assertSee('drink_id');

        $this->json('POST', '/api/sips/', ['drink_id' => $drink->id])->assertStatus(200)
            ->assertJsonFragment(['drink_id'  => $drink->id]);

        $this->json('GET', '/api/sips/')
            ->assertStatus(200)
            ->assertJsonFragment(['drink_id'  => $drink->id])
            ->assertJsonMissing(['bcl' => 0]);
    }
}
