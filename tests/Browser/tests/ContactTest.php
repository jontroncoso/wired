<?php

namespace Tests\Browser\tests;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Support\Facades\Mail;

use Tests\Browser\Pages\LoginPage;
use Tests\Browser\Pages\RegisterPage;
use Tests\Browser\Pages\Cafe;
use Tests\Browser\Pages\ContactPage;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Faker\Factory;

use App\Mail\Contact;
use App\Model\User;

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
            // $mail = $browser->fake(Mail::class);
            $browser->visit('/')
                ->on(new LoginPage)
                ->assertSee('Login')
                ->type('@email', $user->email)
                ->type('@password', 'password')
                ->click('@submit')
                ->waitUntilMissing('@email')

                ->on(new Cafe)
                ->click('@contactButton')

                ->on(new ContactPage)
                // ->type('@subject', $subject)
                ->type('@body', $body.' 555-55-5555 ')
                ->assertSee('SSN detected! Please don\'t pass sensitive information')
                ->assertDontSee('@subjectWithError')
                ->assertVisible('@bodyWithError')

                ->click('@submit')
                ->waitFor('@subjectWithError')
                ->assertVisible('@bodyWithError')


                ->type('@subject', $subject)
                ->type('@body', $body)
                ->click('@submit')
                // ->waitUntilMissing('@subject')
                // ->assertSee('Thank you. You\'re message has been sent')
                ;
            // $mail->assertSent(Contact::class, function ($mail) use ($jon, $subject) {
            //     return $mail->hasTo($jon->email) && $mail->subject == 'WIRED CONTACT: '.$subject;
            // });

        });
    }
}
