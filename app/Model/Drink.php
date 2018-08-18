<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Drink extends Pivot
{
    protected $table = 'drinks';
}
