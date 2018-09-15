<?php

use Illuminate\Database\Seeder;

use App\Model\Drink;

class DrinksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Drink::insert([
            [
                'name'          => 'Earl Grey, Hot',
                'description'   => 'English classic... served hot',
                'dosage'        => 30,
                'price'         => 100,
            ],
            [
                'name'          => 'Monster Ultra Sunrise',
                'description'   =>'A refreshing orange beverage that has 75mg of caffeine per serving. Every can has two servings.',
                'dosage'        => 75,
                'price'         => 200,
            ],
            [
                'name'          => 'Black Coffee',
                'description'   =>'The classic, the average 8oz. serving of black coffee has 95mg of caffeine.',
                'dosage'        => 95,
                'price'         => 350,
            ],
            [
                'name'          => 'Americano',
                'description'   =>'Sometimes you need to water it down a bit... and in comes the americano with an average of 77mg. of caffeine per serving.',
                'dosage'        => 77,
                'price'         => 670,
            ],
            [
                'name'          => 'Sugar free NOS',
                'description'   =>'Another orange delight without the sugar. It has 130 mg. per serving and each can has two servings.',
                'dosage'        => 130,
                'price'         => 740,
            ],
            [
                'name'          => '5 Hour Energy',
                'description'   =>'And amazing shot of get up and go! Each 2 fl. oz. container has 200mg of caffeine to get you going.',
                'dosage'        => 200,
                'price'         => 1000,
            ]
        ]);
    }
}
