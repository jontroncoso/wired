<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(\App\Model\User::class)->create([
            'email'         => 'admin@user.com',
            'password'      => bcrypt('password'),
            'metabolism'    => 10,
        ]);
        factory(\App\Model\User::class)->create([
            'email'         => 'jon.troncoso@gmail.com',
            'password'      => bcrypt('password'),
            'metabolism'    => 10,
        ]);
    }
}
