<?php

use Illuminate\Database\Seeder;

use App\Model\Pokemon;
use App\Model\Type;

class PokemonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = json_decode(file_get_contents('https://gist.githubusercontent.com/andygroff/274283a38f2786796df57e11738d6bba/raw/f8eb9332ac08a4ee75767bcd76904f001cb6ec37/pokemon.json'));
        $types = collect();
        
        foreach($json as $node)
        {
            $pokemon = Pokemon::create(['name' => $node->name]);
            $typeIds = [];
            foreach($node->types as $typeString)
            {
                if(!$types->has($typeString))
                {
                    $types->put($typeString, Type::firstOrCreate(['name' => $typeString]));
                }
                $typeIds[] = $types->get($typeString)->id;
            }
            $pokemon->types()->sync($typeIds);
        }
    }
}
