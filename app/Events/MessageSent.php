<?php

namespace App\Events;

use App\Models\Message;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Message $message) {}

    /**
     * Map payload data elements sent downstream over open sockets.
     */
    public function broadcastWith(): array
    {
        $payload = [
            'id' => $this->message->id,
            'message_text' => $this->message->message_text,
            'created_at' => $this->message->created_at->toIso8601String(),
            'sender' => [
                'id' => $this->message->sender->id,
                'name' => $this->message->sender->name,
                'role' => $this->message->sender->role->value,
            ],
        ];

        // Conditionally include only the relevant ID
        if ($this->message->group_id) {
            $payload['group_id'] = $this->message->group_id;
        } else {
            $payload['conversation_id'] = $this->message->conversation_id;
        }

        return $payload;
    }

    /**
     * Identify channel distribution target structures dynamically.
     */
    public function broadcastOn(): array
    {
        if ($this->message->group_id) {
            return [new PrivateChannel('chat.group.' . $this->message->group_id)];
        }

        return [new PrivateChannel('chat.peer.' . $this->message->conversation_id)];
    }
}
