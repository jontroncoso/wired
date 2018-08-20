<?php

use Faker\Generator as Faker;

$factory->define(App\Model\Drink::class, function (Faker $faker) {
    return [
        'name'          => $faker->name,
        'description'   => $faker->paragraph,
        'dosage'        => $faker->numberBetween(100, 1000),
    ];
});
