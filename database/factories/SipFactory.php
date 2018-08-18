<?php

use Faker\Generator as Faker;

$factory->define(App\Model\Sip::class, function (Faker $faker) {
    return [
        'drink_id'  => function() {
            return factory(\App\Model\Drink::class)->create()->id;
        },
        'sip_id'  => function() {
            return factory(\App\Model\Sip::class)->create()->id;
        },
    ];
});
