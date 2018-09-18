<?php

namespace Tests\Browser\Pages;

use Laravel\Dusk\Browser;

class ContactPage extends Page
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
            '@subject'          => '.modal input[name="subject"]',
            '@body'             => '.modal textarea[name="body"]',
            '@subjectWithError' => '.modal input[name="subject"].is-invalid',
            '@bodyWithError'    => '.modal textarea[name="body"].is-invalid',
            '@submit'           => '.modal button.btn-primary.btn',
            '@errorMessage'     => '.modal .invalid-feedback',
        ];
    }
}
