<?php

namespace App\Policies;

use App\Model\User;
use App\App\Model\Sip;
use Illuminate\Auth\Access\HandlesAuthorization;

class SipPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view/create/delete the sip.
     *
     * @param  \App\Model\User  $user
     * @param  \App\App\Model\Sip  $sip
     * @return mixed
     */
    public function manage(User $user, Sip $sip)
    {
        return (\Auth::user()->id == $user->id && $user->sips()->pluck('id')->contains($sip->id))
            || \Auth::user()->id == 1;
    }

    /**
     * Determine whether the user can create sips.
     *
     * @param  \App\Model\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return \Auth::user()->id == $user->id || \Auth::user()->id == 1;
    }
}
