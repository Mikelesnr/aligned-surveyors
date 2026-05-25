<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\Conversation;
use App\Models\Group;

Broadcast::channel('chat.peer.{conversationId}', function ($user, string $conversationId) {
    $conversation = Conversation::find($conversationId);
    return $conversation && ((string) $user->id === (string) $conversation->user_one_id || (string) $user->id === (string) $conversation->user_two_id);
});

Broadcast::channel('chat.group.{groupId}', function ($user, $groupId) {
    $group = \App\Models\Group::find($groupId);

    // Safety check: if the group was deleted or doesn't exist, 
    // deny the connection immediately.
    if (!$group) return false;

    if ($group->is_private) {
        return $group->members()->where('user_id', $user->id)->exists();
    }

    return true;
});
