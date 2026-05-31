import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ChatBubble from "@/Components/Chat/ChatBubble";

export default function PeerChatWindow({ auth, conversation }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const scrollRef = useRef(null);

    const myColor = "bg-green-700 border border-gray-300 text-white";
    const peerColor = "bg-red-900 border border-gray-300 text-slate-100";
    const myText = "text-white";
    const peerText = "text-gray-900";

    useEffect(() => {
        if (!conversation?.id) return;

        axios
            .get(route("chat.history", { type: "peer", id: conversation.id }))
            .then((res) => setMessages(res.data));

        const channelName = `chat.peer.${conversation.id}`;
        const channel = window.Echo.private(channelName).listen(
            "MessageSent",
            (e) => {
                setMessages((prev) => {
                    if (prev.some((m) => m.id === e.id)) return prev;
                    return [...prev, e];
                });
            },
        );

        return () => window.Echo.leaveChannel(channelName);
    }, [conversation.id]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const text = newMessage.trim();
        setNewMessage("");

        axios.post(route("chat.transmit"), {
            conversation_id: conversation.id,
            message_text: text,
        });
        // Note: We removed the .then() update to state.
        // We let the Echo listener handle adding it to the screen.
    };

    return (
        <div className="flex flex-col h-full bg-slate-850/90 border border-gray-300 rounded-2xl overflow-hidden shadow-sm">
            <div className="flex-1 p-6 overflow-y-auto space-y-2">
                {messages.map((msg) => {
                    const isMe = String(msg.sender.id) === String(auth.user.id);
                    return (
                        <ChatBubble
                            key={msg.id}
                            message={msg}
                            isMe={isMe}
                            bubbleColor={isMe ? myColor : peerColor}
                            textColor={isMe ? myText : peerText}
                            showName={false} // Peer chat doesn't need names
                        />
                    );
                })}
                <div ref={scrollRef} />
            </div>

            <form
                onSubmit={handleSend}
                className="p-4 border-t border-gray-300 bg-slate-850/90 flex gap-3"
            >
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 bg-slate-600 border border-gray-300 rounded-full px-5 py-3 text-slate-50 text-lg outline-none"
                    placeholder="Type a message..."
                />
                <button
                    type="submit"
                    className="bg-green-700 text-white px-8 py-3 rounded-full font-bold text-lg"
                >
                    Send
                </button>
            </form>
        </div>
    );
}
