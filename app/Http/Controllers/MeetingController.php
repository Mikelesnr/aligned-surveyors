<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Group;
use Inertia\Inertia;

class MeetingController extends Controller
{
    // App/Http/Controllers/MeetingController.php
    public function show(Group $group, $meetingId)
    {
        return Inertia::render('Dashboard/Chat/MeetingRoom', [
            'group' => $group,
            'meetingId' => $meetingId,
        ]);
    }
}
