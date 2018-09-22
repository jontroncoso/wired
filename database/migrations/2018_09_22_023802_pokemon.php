<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Pokemon extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pokemon', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
        });

        Schema::create('types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
        });
        Schema::create('pokemon_type', function (Blueprint $table) {
            $table->integer('pokemon_id')->unsigned()->nullable();
            $table->foreign('pokemon_id')->references('id')->on('pokemon')->onDelete('cascade');

            $table->integer('type_id')->unsigned()->nullable();
            $table->foreign('type_id') ->references('id')->on('types')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('pokemon_types');
        Schema::drop('pokemon');
        Schema::drop('types');
    }
}
