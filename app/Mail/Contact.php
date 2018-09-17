<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

use App\Model\User;

class Contact extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $subject;
    public $body;

    public function __construct(User $user, $params)
    {
        $this->user     = $user;
        $this->subject  = 'WIRED CONTACT: '.$params['subject'];
        $this->body     = $params['body'];
    }

    public function build()
    {
        return $this->markdown('emails.contact');
    }
}
