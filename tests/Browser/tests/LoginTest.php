<?php

namespace Tests\Browser\tests;

use Tests\Browser\Pages\LoginPage;

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
    public function testExample()
    {
        $user = factory(\App\Model\User::class)->create(['password' => bcrypt('password')]);
        $this->browse(function (Browser $browser) use ($user) {
            $browser->visit('/')
                ->on(new LoginPage)
                ->assertSee('Login')
                ->assertVisible('@email')
                ->assertVisible('@password')
                ->assertDontSee('@confirm')
                ->type('@email', $user->email.'bad')
                ->type('@password', 'password')
                ->click('@submit')
                ->whenAvailable('@error', function($error) {
                    $error->assertSee('The given data was invalid.');
                })
                ->type('@email', $user->email)
                ->click('@submit')
                ->waitUntilMissing('@email')
                ->assertPathIs('/')
                ->on(new HomePage)
                ->whenAvailable()
                ;
        });
    }
}
