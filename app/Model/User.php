<?php

namespace App\Model;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];


    public function sips()
    {
        return $this->hasMany(\App\Model\Sip::class);
    }

    public function drinks()
    {
        return $this->belongsToMany(\App\Model\Drink::class, 'sips', 'user_id', 'drink_id');
    }

    protected function getBclAttribute()
    {
        $metabolism = $this->metabolism;
        $return = $this->sips()
            ->with('drink')
            ->get()
            ->map(function($sip) use ($metabolism) {
                $time = intval(time()-$sip->created_at->timestamp);
                // return $sip->drink->dosage*(1/pow($metabolism, $time));
                return exp(-(1/$metabolism*$time) + log($sip->drink->dosage));
            })
            ->sum();
        return $return;
    }
}
