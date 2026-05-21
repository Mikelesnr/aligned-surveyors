<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        // Logic to send the email
        // Replace 'info@alignedsurveyors.com' with your actual receiving address
        Mail::raw($validated['message'], function ($message) use ($validated) {
            $message->to('info@alignedsurveyors.com')
                ->from($validated['email'], $validated['name'])
                ->subject('New Contact Inquiry: ' . $validated['name']);
        });

        // Redirect back with a success message
        return back()->with('status', 'Thank you for your message. We will get back to you shortly.');
    }
}
