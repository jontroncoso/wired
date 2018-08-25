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
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $return = [
            'email'     => 'required|email|exists:users,email',
            'password'  => 'required|string',
        ];
        \Log::info('FormRequest::path()');
        \Log::info(FormRequest::path());
        if(FormRequest::path() == 'api/auth/register')
        {
            $return['email']        = 'required|email|unique:users,email';
            $return['confirm']      = 'required|same:password';
            $return['name']         = 'required|string';
            $return['metabolism']   = 'required|integer';
        }
        return $return;
    }
}
