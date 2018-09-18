<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

use App\Http\Requests\ContactRequest;
use App\Mail\Contact;
use App\Model\User;

class ContactController extends Controller
{
    public function send(ContactRequest $request) {
        \Log::info(\Auth::user());
        Mail::to(User::find(2))
            ->send(new Contact(\Auth::user(), $request->validated()));
        return response()->json(['message' => 'Thank you. You\'re message has been sent']);
    }
}
