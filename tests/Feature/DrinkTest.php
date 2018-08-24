<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Model\User;
use App\Model\Drink;

class DrinkTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testListDrinks()
    {
        $admin          = User::find(1);
        $user           = factory(User::class)->create();
        $drink          = factory(Drink::class)->make();
        $drinkTemplate  = factory(Drink::class)->make();

        $this->json('GET', '/api/drinks/')
            ->assertStatus(401)
            ->assertJson(["message" => "Unauthenticated."]);

        $this->actingAs($user);

        $this->json('GET', '/api/drinks/')
            ->assertStatus(200)
            ->assertJsonMissing($drink->toArray());

        $this->json('POST', '/api/drinks/', $drink->toArray())
            ->assertStatus(403)
            ->assertJsonMissing($drink->toArray());

        $this->be($admin);

        $this->json('POST', '/api/drinks/', $drink->toArray())
            ->assertStatus(200)
            ->assertJsonFragment($drink->toArray());

        $this->assertEquals(1, Drink::count());
        $createdDrink = Drink::first();

        $this->json('GET', '/api/drinks/')
            ->assertStatus(200)
            ->assertJsonFragment($createdDrink->toArray());

        $this->json('PUT', '/api/drinks/'.$createdDrink->id, $drinkTemplate->toArray())
            ->assertStatus(200)
            ->assertJsonFragment($drinkTemplate->toArray());

        $this->assertEquals(1, Drink::count());
        $updatedDrink = Drink::first();
        $this->json('GET', '/api/drinks/')
            ->assertStatus(200)
            ->assertJsonMissing($drink->toArray())
            ->assertJsonFragment($drinkTemplate->toArray());

    }
}
