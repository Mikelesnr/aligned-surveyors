// resources/js/Components/Chat/ChatBubble.jsx
import React, { useEffect } from "react";
import { formatChatDate } from "@/Utils/formatChatDate";

export default function ChatBubble({
    message,
    isMe,
    bubbleColor,
    textColor,
    showName = false,
    children, // Added this to accept the custom JSX from GroupChatWindow
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
                className={`max-w-[95%] px-5 py-3 rounded-2xl ${bubbleColor} ${textColor} ${isMe ? "rounded-br-none" : "rounded-bl-none"}`}
            >
                {/* Sender Name */}
                {showName && !isMe && (
                    <p className="text-xs font-bold mb-1 opacity-75">
                        {message.sender.name}
                    </p>
                )}

                {/* DYNAMIC CONTENT: Use children if provided, otherwise default to message_text */}
                <div className="text-xl leading-relaxed">
                    {children ? children : <p>{message.message_text}</p>}
                </div>

                {/* Timestamp */}
                <div className={`text-xs mt-1 opacity-70`}>
                    {formatChatDate(message.created_at)}
                </div>
            </div>
        </div>
    );
}
