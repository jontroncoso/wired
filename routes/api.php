<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('register', 'AuthController@register');
    Route::get('me', 'AuthController@me');
});

Route::get('pokemon/{term}', 'PokemonController@search');

Route::group(['middleware' => 'auth:api'], function() {
    Route::apiResource('sips', 'SipsController');
    Route::apiResource('drinks', 'DrinkController');
    Route::post('contact', 'ContactController@send');
});
