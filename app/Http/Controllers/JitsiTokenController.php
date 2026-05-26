<?php

namespace App\Http\Controllers;

use App\Services\JitsiService;
use Illuminate\Http\Request;

class JitsiTokenController extends Controller
{
    // Laravel injects the singleton here automatically
    public function __construct(protected JitsiService $jitsiService) {}

    public function generate(Request $request)
    {
        // Get the room from query parameters
        $room = $request->query('room');

        // Pass the user and room to the service
        $token = $this->jitsiService->generateToken($request->user(), $room);

        return response()->json(['token' => $token]);
    }
}
