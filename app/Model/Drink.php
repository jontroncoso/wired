<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Drink extends Pivot
{
    protected $table = 'drinks';

    public function getPriceAttribute($price)
    {
        return number_format($price/100, 2);
    }
    public function setPriceAttribute($price)
    {
        $this->attributes['price'] = intval($price*100);
    }

    public function getPriceFloat()
    {
        return $this->price/100;
    }
}
