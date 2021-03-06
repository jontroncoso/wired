<?php

namespace Tests\Browser\Pages;

use Laravel\Dusk\Browser;

class LoginPage extends Page
{
    /**
     * Get the URL for the page.
     *
     * @return string
     */
    public function url()
    {
        return '/login';
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
            '@password'     => 'input[name="password"]',
            '@submit'       => 'button.btn-primary.btn',
            '@error'        => '.alert.alert-danger',
            '@registerLink' => 'a.btn-link[href="/register"]',
        ];
    }
}
