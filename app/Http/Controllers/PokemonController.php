<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Model\Pokemon;

class PokemonController extends Controller
{
    public function search($term)
    {
        $pokemon = Pokemon::with('types')
            ->whereHas('types', function ($query) use ($term){
                $query->where('name', 'like', '%'.$term.'%');
            })->orWhere('name', 'like', '%'.$term.'%')->get()->values();
        return response()->json(['pokemon' => $pokemon]);
    }
}
