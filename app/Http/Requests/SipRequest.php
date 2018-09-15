<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SipRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if(FormRequest::isMethod('put'))
        {
            $params = FormRequest::route()->parameters();
            return \Auth::user()->can('manage', $params['sip']);
        }
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'drink_id'  => 'required|int|exists:drinks,id',
        ];
    }
}
