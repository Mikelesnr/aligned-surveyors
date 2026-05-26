// resources/js/Components/Chat/MeetingChatWindow.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import ChatBubble from "./ChatBubble";

export default function MeetingChatWindow({ group, auth }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const scrollRef = useRef(null);

    // 1. Fetch history and setup Echo
    useEffect(() => {
        axios
            .get(route("chat.history", ["group", group.id]))
            .then((res) => setMessages(res.data));

        const channel = window.Echo.private(`chat.group.${group.id}`).listen(
            "MessageSent",
            (e) => {
                setMessages((prev) => {
                    if (prev.some((m) => m.id === e.id)) return prev;
                    return [...prev, e];
                });
            },
        );
        return () => window.Echo.leaveChannel(`chat.group.${group.id}`);
    }, [group.id]);

    // 2. Filter out meeting alerts
    const conversationMessages = useMemo(
        () => messages.filter((msg) => !msg.is_meeting_alert),
        [messages],
    );

    // 3. Auto-scroll
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [conversationMessages]);

    // 4. Send message handler
    const sendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const tempMessage = {
            id: Date.now(),
            message_text: newMessage,
            sender: auth.user,
            created_at: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, tempMessage]);
        const text = newMessage;
        setNewMessage("");

        axios
            .post(route("groups.messages.store", group.id), {
                message_text: text,
            })
            .catch(() => {
                setMessages((prev) =>
                    prev.filter((m) => m.id !== tempMessage.id),
                );
                alert("Failed to send message.");
            });
    };

    return (
        <div className="flex flex-col h-full bg-white border-l">
            {/* Header */}
            <div className="p-4 border-b">
                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500">
                    Meeting Chat
                </h3>
            </div>

            {/* Message Stream */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                {conversationMessages.map((msg) => {
                    const senderId = msg.sender?.id;
                    const isMe = parseInt(senderId) === parseInt(auth.user.id);

                    return (
                        <ChatBubble
                            key={msg.id}
                            message={msg}
                            isMe={isMe}
                            // Using standard colors consistent with your app
                            bubbleColor={isMe ? "bg-green-700" : "bg-gray-200"}
                            textColor={isMe ? "text-white" : "text-gray-900"}
                            showName={true}
                        />
                    );
                })}
                <div ref={scrollRef} />
            </div>

            {/* Input Form */}
            <form
                onSubmit={sendMessage}
                className="p-4 border-t flex gap-2 bg-white"
            >
                <input
                    className="flex-1 border rounded-full px-4 py-2 outline-none"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-full font-bold"
                >
                    Send
                </button>
            </form>
        </div>
    );
}
