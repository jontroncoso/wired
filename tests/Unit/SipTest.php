<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class SipTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
        $user = factory(\App\Model\User::class)->create();
        $drink = factory(\App\Model\Drink::class)->create();

        $this->assertEmpty($user->sips()->count());
        $user->drinks()->attach($drink);
        $this->assertEquals($user->sips()->count(), 1);

    }
}
