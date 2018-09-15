<?php

namespace App\Policies;

use App\Model\User;
use App\App\Model\Drink;
use Illuminate\Auth\Access\HandlesAuthorization;

class DrinkPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can create drinks.
     *
     * @param  \App\Model\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $this->admin($user);
    }

    /**
     * Determine whether the user can update the drink.
     *
     * @param  \App\Model\User  $user
     * @param  \App\App\Model\Drink  $drink
     * @return mixed
     */
    public function update(User $user, Drink $drink)
    {
        return $this->admin($user);
    }

    /**
     * Determine whether the user can delete the drink.
     *
     * @param  \App\Model\User  $user
     * @param  \App\App\Model\Drink  $drink
     * @return mixed
     */
    public function delete(User $user, Drink $drink)
    {
        return $this->admin($user);
    }

    public function admin(User $user)
    {
        return $user->id == 1;
    }
}
