<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormMailable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        // Retrieve the admin email from .env
        $adminEmail = env('ADMIN_CONTACT_EMAIL', 'info@alignedsurveyors.com');

        // 1. Send notification to you
        Mail::to($adminEmail)->send(new ContactFormMailable($validated, false));

        // 2. Send auto-response to the user
        Mail::to($validated['email'])->send(new ContactFormMailable($validated, true));

        return back()->with('status', 'Thank you! A confirmation email has been sent.');
    }
}
