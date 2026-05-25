<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ConversationController extends Controller
{
    /**
     * Get all conversations associated with the authenticated user.
     */
    public function index()
    {
        $authId = auth()->id();
        return response()->json(
            \App\Models\Conversation::where('user_one_id', $authId)
                ->orWhere('user_two_id', $authId)
                ->with(['userOne:id,name,role', 'userTwo:id,name,role'])
                ->latest()
                ->get()
                ->map(function ($convo) use ($authId) {
                    $convo->recipient = ($convo->user_one_id === $authId) ? $convo->userTwo : $convo->userOne;
                    return $convo;
                })
        );
    }

    /**
     * Create a new conversation explicitly.
     */
    public function store(Request $request)
    {
        $validated = $request->validate(['recipient_id' => 'required|exists:users,id']);
        $authId = auth()->id();

        // Create the record. Let the database unique constraint handle duplicates.
        return response()->json(Conversation::create([
            'id' => Str::uuid(),
            'user_one_id' => $authId,
            'user_two_id' => $validated['recipient_id'],
        ]), 201);
    }

    /**
     * Destroy a conversation.
     */
    public function destroy(string $id)
    {
        $conversation = Conversation::findOrFail($id);

        if ($conversation->user_one_id !== auth()->id() && $conversation->user_two_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $conversation->delete();
        return response()->json(['message' => 'Conversation removed']);
    }
}
