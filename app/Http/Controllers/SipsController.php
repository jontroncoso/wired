<?php

namespace App\Http\Controllers;

use App\Model\Sip;
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
            'sips'  => $user->sips->map(function($sip){
                $sip->append('dosage');
                return $sip;
            }),
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
        return response()->json([
            'sip' => Sip::create($request->validated() + ['user_id' => \Auth::user()->id])
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Model\Sip  $sip
     * @return \Illuminate\Http\Response
     */
    public function show(Sip $sip)
    {
        abort(404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Sip  $sip
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Sip $sip)
    {
        abort(404);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Sip  $sip
     * @return \Illuminate\Http\Response
     */
    public function destroy(Sip $sip)
    {
        abort(404);
    }
}
