<?php

use Faker\Generator as Faker;

$factory->define(App\Model\Sip::class, function (Faker $faker) {
    $drink = factory(\App\Model\Drink::class)->create();
    return [
        'drink_id'  => $drink->id,
        'dosage'    => $drink->dosage,
        'sip_id'    => function() {
            return factory(\App\Model\Sip::class)->create()->id;
        },
    ];
});
