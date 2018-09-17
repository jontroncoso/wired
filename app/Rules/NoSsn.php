<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class NoSsn implements Rule
{

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return !preg_match("/[0-9]{3}[^0-9][0-9]{2}[^0-9][0-9]{4}/", $value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'SSN detected! Please don\'t pass sensitive information!';
    }
}
