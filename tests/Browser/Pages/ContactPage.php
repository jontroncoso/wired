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
        return '/cafe';
    }

    /**
     * Assert that the browser is on the page.
     *
     * @param  Browser  $browser
     * @return void
     */
    public function assert(Browser $browser)
    {
        // $browser->assertPathIs($this->url());
    }

    /**
     * Get the element shortcuts for the page.
     *
     * @return array
     */
    public function elements()
    {
        return [
            '@subject'          => 'input[name="subject"]',
            '@body'             => 'input[name="body"]',
            '@subjectWithError' => 'input[name="subject"].is-invalid',
            '@bodyWithError'    => 'input[name="body"].is-invalid',
            '@submit'           => 'button.btn-primary.btn',
            '@errorMessage'     => '.invalid-feedback',
        ];
    }
}
