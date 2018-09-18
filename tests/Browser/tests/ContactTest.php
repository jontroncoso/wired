<?php

namespace Tests\Browser\tests;

use Tests\Browser\Pages\LoginPage;
use Tests\Browser\Pages\RegisterPage;
use Tests\Browser\Pages\HomePage;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class ContactTest extends DuskTestCase
{
    /**
     * A Dusk test example.
     *
     * @return void
     */
    public function testLogin()
    {
        $faker  = Factory::create();
        $subject = $faker->sentence;
        $body = $faker->paragraph;
        $jon  = User::find(2);
        $user   = factory(User::class)->create();
        $this->browse(function (Browser $browser) use ($user, $jon, $body, $subject) {
            // Mail::fake();
            $browser->visit('/')
                ->on(new LoginPage)
                ->assertSee('Login')
                ->type('@email', $user->email)
                ->type('@password', 'password')
                ->click('@submit')
                ->waitUntilMissing('@email')

                ->on(new HomePage)
                ->click('@contactButton')

                ->on(new ContactPage)
                // ->type('@subject', $subject)
                ->type('@body', $body.' 555-55-5555 ')
                ->assertSee('SSN detected! Please don\'t pass sensitive information')
                ->assertDontSee('@subjectWithError')
                ->assertVisible('@bodyWithError')

                ->click('@submit')
                ->assertVisible('@subjectWithError')
                ->assertVisible('@bodyWithError')


                ->type('@subject', $subject)
                ->type('@body', $body)
                ->click('@submit')
                ->waitUntilMissing('@subject')
                ->assertSee('Thank you. You\'re message has been sent')
                ;
        });
    }
}
