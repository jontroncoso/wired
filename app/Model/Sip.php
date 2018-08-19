<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Sip extends Pivot
{
    protected $table = 'sips';

    public function drink()
    {
        return $this->belongsTo(\App\Model\Drink::class);
    }
    public function user()
    {
        return $this->belongsTo(\App\Model\User::class);
    }
}
