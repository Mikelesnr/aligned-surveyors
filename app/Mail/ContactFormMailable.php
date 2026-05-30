<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactFormMailable extends Mailable
{
    use Queueable, SerializesModels;

    public mixed $data;
    public bool $isAutoResponse;

    public function __construct(mixed $data, bool $isAutoResponse = false)
    {
        $this->data = $data;
        $this->isAutoResponse = $isAutoResponse;
    }

    public function build()
    {
        return $this->subject($this->isAutoResponse ? 'Thank you for contacting us' : 'New Contact Inquiry')
            ->view('emails.contact-template');
    }
}
