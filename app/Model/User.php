<?php

namespace App\Model;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;


class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    public $casts = ['metabolism' => 'integer'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'metabolism'
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
                $time = intval(time()-$sip->created_at);
                // return $sip->drink->dosage*(1/pow($metabolism, $time));
                return intval(exp(-(1/$metabolism*$time) + log($sip->drink->dosage)));
            })
            ->sum();
        return $return;
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

}
