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

    public function getDosageAttribute()
    {
        return $this->drink()->value('dosage');
    }

    public function getCreatedAtAttribute($createdAt)
    {
        \Log::info('$createdAt');
        \Log::info($createdAt);
        return (new \Carbon\Carbon($createdAt))->timestamp;
    }
}
