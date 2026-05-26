<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Message;
use App\Models\Conversation;
use App\Events\MessageSent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{

    /**
     * Collect chronological histories for active target panes.
     */
    public function fetchMessages(string $type, string $id)
    {
        $query = Message::with('sender:id,name,role')->orderBy('created_at', 'asc');

        if ($type === 'group') {
            $group = Group::findOrFail($id);
            if (!$group->members()->where('user_id', Auth::id())->exists()) {
                abort(403, 'Unauthorized channel stream access.');
            }
            $messages = $query->where('group_id', $id)->get();
        } else {
            $conversation = Conversation::findOrFail($id);
            if ($conversation->user_one_id !== Auth::id() && $conversation->user_two_id !== Auth::id()) {
                abort(403, 'Unauthorized peer line access.');
            }
            $messages = $query->where('conversation_id', $id)->get();
        }

        return response()->json($messages);
    }

    /**
     * Commit single transmissions onto the storage schema while triggering network broadcasts.
     */
    public function sendMessage(Request $request)
    {
        // The message MUST belong to an existing conversation
        $validated = $request->validate([
            'conversation_id' => 'required|uuid|exists:conversations,id',
            'message_text'    => 'required|string|max:5000',
        ]);

        $message = Message::create([
            'user_id'         => Auth::id(),
            'conversation_id' => $validated['conversation_id'],
            'message_text'    => $validated['message_text'],
            'created_at'      => now(),
        ]);

        $message->load('sender:id,name,role');

        // Broadcast the message so the other user's screen refreshes/updates
        broadcast(new MessageSent($message));

        return response()->json($message);
    }

    public function sendGroupMessage(Request $request, string $groupId)
    {
        // 1. Validate membership to prevent unauthorized posting
        $group = \App\Models\Group::findOrFail($groupId);
        if (!$group->members()->where('user_id', Auth::id())->exists()) {
            abort(403, 'You are not a member of this group.');
        }

        // 2. Validate input
        $validated = $request->validate([
            'message_text' => 'required|string|max:5000',
        ]);

        // 3. Create the message
        $message = Message::create([
            'user_id'      => Auth::id(),
            'group_id'     => $groupId,
            'message_text' => $validated['message_text'],
            'created_at'   => now(),
        ]);

        // 4. Load sender for the broadcast payload
        $message->load('sender:id,name,role');

        // 5. Broadcast to the group channel using your existing event
        broadcast(new MessageSent($message))->toOthers();

        return response()->json($message);
    }
}
