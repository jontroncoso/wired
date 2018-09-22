<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    public $timestamps = false;
    public $hidden = ['pivot'];

    public function pokemon(){
        return $this->belongsToMany(\App\Model\Type::class);
    }
}
