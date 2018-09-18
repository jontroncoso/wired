<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;
use Faker\Factory;

use App\Mail\Contact;
use App\Model\User;
class ContactTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testSubmitContactForm()
    {
        $faker  = Factory::create();
        $subject = $faker->sentence;
        $body = $faker->paragraph;
        $jon  = User::find(2);
        $user   = factory(User::class)->create();
        Mail::fake();

        $this->json('POST', '/api/contact')
            ->assertStatus(401)
            ->assertJson(["message" => "Unauthenticated."]);

        $this->actingAs($user);

        $this->json('POST', '/api/contact')
            ->assertStatus(422);

        $this->json('POST', '/api/contact', ['subject' => $subject, 'body' => $body])
            ->assertStatus(200);

        Mail::assertSent(Contact::class, function ($mail) use ($jon, $subject) {
            return $mail->hasTo($jon->email) && $mail->subject == 'WIRED CONTACT: '.$subject;
        });
    }
}
