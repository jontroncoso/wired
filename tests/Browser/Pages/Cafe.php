<?php

namespace Tests\Browser\Pages;

use Laravel\Dusk\Browser;

class Cafe extends Page
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
            '@chalkboard'   => '.chalkboard',
            '@lastDrink'    => 'a.list-item:last-child',
            '@speechBubble' => '.speech-bubble',
            '@contactButton' => '.store-front .btn-secondary',
        ];
    }
}
