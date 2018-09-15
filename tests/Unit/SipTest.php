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
        $user = factory(\App\Model\User::class)->create(['metabolism' => 1]);
        $drink = factory(\App\Model\Drink::class)->create();

        $this->assertEmpty($user->sips()->count());
        // $user->drinks()->attach($drink); I could use a pivot event listener to ensure this works (3rd party)
        // but I'm just going to make sure I use the pivot model every time I create a sip
        \App\Model\Sip::create([
            'user_id'   => $user->id,
            'drink_id'  => $drink->id,
            'dosage'    => $drink->dosage,
        ]);
        $firstBcl = $user->bcl;
        $this->assertEquals($user->sips()->count(), 1);
        $this->assertLessThanOrEqual($drink->dosage, $firstBcl);
        $this->assertGreaterThan(0, $firstBcl);
        sleep(2);
        $secondBcl = $user->bcl;
        $this->assertLessThan($firstBcl, $secondBcl);
        $this->assertGreaterThan(0, $secondBcl);
    }
}
