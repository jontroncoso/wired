<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DrinkRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return \Auth::check() && (FormRequest::isMethod('get') || \Auth::user()->id === 1);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $drink = $this->route('drink');
        $return = [
            'name'          => 'string|unique:drinks,name',
            'description'   => 'string|unique:drinks,description',
            'dosage'        => 'integer|between:0,1000000',
            'price'         => 'numeric|between:0,1000000',
        ];
        if($drink) {
            $return['name'] .= ','.$drink->id;
            $return['description'] .= ','.$drink->id;
        }
        return $return;
    }
}
