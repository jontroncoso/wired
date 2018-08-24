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
        $admin = factory(\App\Model\User::class)->create([
            'email'         => 'admin@user.com',
            'password'      => bcrypt('password'),
            'metabolism'    => 10,
        ]);
    }
}
