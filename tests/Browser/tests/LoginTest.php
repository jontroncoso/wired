<?php

namespace Tests\Browser\tests;

use Tests\Browser\Pages\LoginPage;
use Tests\Browser\Pages\RegisterPage;
use Tests\Browser\Pages\HomePage;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class LoginTest extends DuskTestCase
{
    /**
     * A Dusk test example.
     *
     * @return void
     */
    public function testLogin()
    {
        $user = factory(\App\Model\User::class)->make(['password' => bcrypt('password')]);
        $drink = factory(\App\Model\Drink::class)->create();
        $this->browse(function (Browser $browser) use ($user, $drink) {
            $browser->visit('/')
                ->on(new LoginPage)
                ->assertSee('Login')
                ->assertVisible('@email')
                ->assertVisible('@password')
                ->assertDontSee('@confirm')
                ->click('@registerLink')

                ->on(new RegisterPage)
                ->type('@email', $user->email.'bad')
                ->type('@username', $user->name)
                ->type('@password', 'password')
                ->type('@confirm', 'password')
                ->click('@submit')
                ->waitUntilMissing('@email')

                ->on(new HomePage)
                ->whenAvailable('@chalkboard', function($chalkboard) use ($drink)
                {
                    $chalkboard
                        ->assertSee('Wired Cafe')
                        ->assertSee($drink->name)
                        ->mouseover('@lastDrink')
                        ;
                })
                ->whenAvailable('@speechBubble', function($speechBubble) use ($drink) {
                    $speechBubble->assertSee($drink->description);
                })
                ->click('@lastDrink')
                ;
        });
    }
}
