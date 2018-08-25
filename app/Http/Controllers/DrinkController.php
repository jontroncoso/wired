<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Model\Drink;
use App\Http\Requests\DrinkRequest;

class DrinkController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(['drinks' => Drink::get()]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(DrinkRequest $request)
    {
        return response()->json(['drink' => Drink::create($request->validated())]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Model\Drink  $drink
     * @return \Illuminate\Http\Response
     */
    public function show(Drink $drink)
    {
        return response()->json(['drink' => $drink]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Drink  $drink
     * @return \Illuminate\Http\Response
     */
    public function update(DrinkRequest $request, Drink $drink)
    {
        $drink->update($request->validated());
        return response()->json(['drink' => $drink]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Drink  $drink
     * @return \Illuminate\Http\Response
     */
    public function destroy(Drink $drink)
    {
        abort(404);
    }
}
