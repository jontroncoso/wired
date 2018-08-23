<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // anybody can access
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $return = [
            'email'     => 'required|email',
            'password'  => 'required|string',
        ];
        if(Route::path() == '/register')
        {
            $return['confirm'] = 'required|same:password';
            $return['name'] = 'required|string';
        }
        return $return;
    }
}
