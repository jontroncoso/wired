<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Pokemon extends Model
{
    public $timestamps = false;
    public $hidden = ['pivot'];
    
    public function types(){
        return $this->belongsToMany(\App\Model\Type::class);
    }
}
