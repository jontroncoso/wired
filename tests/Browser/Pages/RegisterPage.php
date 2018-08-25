<?php

namespace Tests\Browser\Pages;

use Laravel\Dusk\Browser;

class RegisterPage extends Page
{
    /**
     * Get the URL for the page.
     *
     * @return string
     */
    public function url()
    {
        return '/register';
    }

    /**
     * Assert that the browser is on the page.
     *
     * @param  Browser  $browser
     * @return void
     */
    public function assert(Browser $browser)
    {
        $browser->assertPathIs($this->url());
    }

    /**
     * Get the element shortcuts for the page.
     *
     * @return array
     */
    public function elements()
    {
        return [
            '@email'        => 'input[name="email"]',
            '@username'     => '#register-name',
            '@password'     => 'input[name="password"]',
            '@confirm'      => 'input[name="confirm"]',
            '@metabolism'   => 'input[name="metabolism"]',
            '@submit'       => 'button.btn-primary.btn',
            '@error'        => '.alert.alert-danger',
        ];
    }
}
