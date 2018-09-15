<?php

namespace App\Http\Controllers;

use App\Model\Sip;
use App\Model\Drink;

use Illuminate\Http\Request;
use App\Http\Requests\SipRequest;

class SipsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = \Auth::user();
        return response()->json([
            'sips'  => $user->sips()->orderBy('created_at', 'desc')->get(),
            'bcl'   => $user->bcl,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SipRequest $request)
    {
        $drink  = Drink::find($request->get('drink_id'));
        $sip    = Sip::create([
            'drink_id'  => $drink->id,
            'user_id'   => \Auth::user()->id,
            'dosage'    => $drink->dosage,
        ]);
        return response()->json(compact('sip'));
    }
}
