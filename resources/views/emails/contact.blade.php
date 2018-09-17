@component('mail::message')

# You've been contacted!
{{ $user->email }}
{{ $user->name }}

# Body
{{ $body }}

@endcomponent
