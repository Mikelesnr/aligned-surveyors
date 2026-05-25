// resources/js/Components/Chat/ChatBubble.jsx
import React, { useEffect } from "react";
import { formatChatDate } from "@/Utils/formatChatDate";

export default function ChatBubble({
    message,
    isMe,
    bubbleColor,
    textColor,
    showName = false,
}) {
    // Play sound ONLY if it's an incoming message (on mount)
    useEffect(() => {
        if (!isMe) {
            new Audio("/sounds/notification.mp3").play().catch(() => {});
        }
    }, []);

    return (
        <div
            className={`flex flex-col ${isMe ? "items-end" : "items-start"} mb-2`}
        >
            <div
                className={`max-w-[70%] px-5 py-3 rounded-2xl ${bubbleColor} ${textColor} ${isMe ? "rounded-br-none" : "rounded-bl-none"}`}
            >
                {/* Conditionally show sender name for Group contexts */}
                {showName && !isMe && (
                    <p className="text-xs font-bold mb-1 opacity-75">
                        {message.sender.name}
                    </p>
                )}
                <p className="text-xl leading-relaxed">
                    {message.message_text}
                </p>
                <div className={`text-xs mt-1 opacity-70`}>
                    {formatChatDate(message.created_at)}
                </div>
            </div>
        </div>
    );
}
