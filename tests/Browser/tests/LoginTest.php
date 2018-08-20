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
        $this->browse(function (Browser $browser) {
            $browser->visit('/')
                ->on(new LoginPage)
                ->assertSee('Login')
                ->assertVisible('@email')
                ->assertVisible('@password')
                ->assertDontSee('@confirm')
                ;
        });
    }
}
