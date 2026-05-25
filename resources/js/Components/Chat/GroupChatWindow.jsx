import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import ChatBubble from "./ChatBubble";
import Modal from "@/Components/Modal";

const USER_COLORS = [
    { bg: "bg-blue-100", text: "text-blue-900" },
    { bg: "bg-purple-100", text: "text-purple-900" },
    { bg: "bg-green-100", text: "text-green-900" },
    { bg: "bg-yellow-100", text: "text-yellow-900" },
    { bg: "bg-pink-100", text: "text-pink-900" },
    { bg: "bg-indigo-100", text: "text-indigo-900" },
];

export default function GroupChatWindow({
    group,
    auth,
    isGroupAdmin,
    availableUsers,
}) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState("");
    const scrollRef = useRef(null);

    // Map sender IDs to colors using the 'members' relationship
    const userColorMap = useMemo(() => {
        const map = {};
        group.members?.forEach((user, index) => {
            map[user.id] = USER_COLORS[index % USER_COLORS.length];
        });
        return map;
    }, [group.members]);

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

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        // 1. Create a temporary message object for instant UI update
        const tempMessage = {
            id: Date.now(), // Temporary ID
            message_text: newMessage,
            sender: auth.user, // Ensure the current user is shown as the sender
            created_at: new Date().toISOString(),
        };

        // 2. Update state immediately
        setMessages((prev) => [...prev, tempMessage]);
        const text = newMessage;
        setNewMessage("");

        // 3. Send to backend
        axios
            .post(route("groups.messages.store", group.id), {
                message_text: text,
            })
            .catch(() => {
                // If it fails, remove the temporary message
                setMessages((prev) =>
                    prev.filter((m) => m.id !== tempMessage.id),
                );
                alert("Failed to send message.");
            });
    };

    const addMember = (e) => {
        e.preventDefault();
        axios
            .post(route("groups.addMember", group.id), {
                user_id: selectedUserId,
            })
            .then(() => {
                setShowAddModal(false);
                setSelectedUserId("");
                alert("Member added successfully!");
            });
    };

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Header */}
            <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-2xl font-bold">#{group.name}</h2>
                {isGroupAdmin && (
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                    >
                        + Add Member
                    </button>
                )}
            </div>

            {/* Message Stream */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                {messages.map((msg) => {
                    // Logic to match the sender ID exactly as you defined for your bubbles
                    const senderId = msg.sender?.id;
                    const isMe = parseInt(senderId) === parseInt(auth.user.id);
                    const colors = userColorMap[senderId] || {
                        bg: "bg-gray-200",
                        text: "text-gray-900",
                    };

                    return (
                        <ChatBubble
                            key={msg.id}
                            message={msg}
                            isMe={isMe}
                            bubbleColor={isMe ? "bg-green-700" : colors.bg}
                            textColor={isMe ? "text-white" : colors.text}
                            showName={!isMe}
                        />
                    );
                })}
                <div ref={scrollRef} />
            </div>

            {/* Input Form */}
            <form
                onSubmit={sendMessage}
                className="p-6 border-t flex gap-4 bg-white"
            >
                <input
                    className="flex-1 border rounded-full px-6 py-3 text-lg outline-none"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white px-8 py-3 rounded-full font-bold"
                >
                    Send
                </button>
            </form>

            {/* Add Member Modal */}
            <Modal show={showAddModal} onClose={() => setShowAddModal(false)}>
                <form onSubmit={addMember} className="p-6">
                    <h3 className="text-lg font-bold mb-4">Add Member</h3>
                    <select
                        value={selectedUserId}
                        onChange={(e) => setSelectedUserId(e.target.value)}
                        className="w-full mb-4 border rounded p-2"
                        required
                    >
                        <option value="">Select a user...</option>
                        {availableUsers?.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => setShowAddModal(false)}
                            className="px-4 py-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Add Member
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
