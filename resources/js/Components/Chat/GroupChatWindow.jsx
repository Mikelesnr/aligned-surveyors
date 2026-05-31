import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import ChatBubble from "./ChatBubble";
import Modal from "@/Components/Modal";
import MeetingAction from "@/Components/Chat/MeetingAction";

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

    const isPersonnel = useMemo(
        () => ["admin", "staff"].includes(auth.user.role),
        [auth.user.role],
    );

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
        // Only scroll if the user is already near the bottom
        const container = scrollRef.current?.parentElement;
        if (container) {
            const isAtBottom =
                container.scrollHeight - container.scrollTop <=
                container.clientHeight + 100;
            if (isAtBottom) {
                scrollRef.current?.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [messages]);

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
        <div className="flex flex-col text-slate-100 h-full bg-slate-850/90 border border-gray-300 rounded-2xl overflow-hidden shadow-sm">
            {/* Header */}
            <div className="p-4 border-b flex flex-col md:flex-row justify-between items-center gap-3">
                {/* Group Info - min-w-0 allows truncation */}
                <div className="flex items-center gap-3 min-w-0 w-full md:w-auto justify-center md:justify-start">
                    {group.logo_url ? (
                        <img
                            src={group.logo_url}
                            alt={group.name}
                            className="w-8 h-8 rounded-full object-cover border border-slate-700"
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                            {group.name.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <h2 className="text-lg md:text-2xl font-bold truncate">
                        {group.name}
                    </h2>
                </div>

                {/* Responsive Button Row */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-end shrink-0">
                    <div className="shrink">
                        <MeetingAction
                            group={group}
                            isPersonnel={isPersonnel}
                            isGroupAdmin={isGroupAdmin}
                            onAddMember={() => setShowAddModal(true)}
                        />
                    </div>

                    {/* {isGroupAdmin && (
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="bg-slate-600 text-slate-100 px-3 py-2 rounded-lg text-xs hover:bg-blue-700 shrink-0"
                        >
                            <span className="md:hidden">+ Add</span>
                            <span className="hidden md:inline">
                                + Add Member
                            </span>
                        </button>
                    )} */}
                </div>
            </div>

            {/* Message Stream */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-transparent min-h-0">
                {messages.map((msg) => {
                    const senderId = msg.sender?.id;
                    const isMe = parseInt(senderId) === parseInt(auth.user.id);
                    const colors = userColorMap[senderId] || {
                        bg: "bg-red-900",
                        text: "text-white",
                    };

                    const isMeetingAlert = !!msg.is_meeting_alert;

                    return (
                        <ChatBubble
                            key={msg.id}
                            message={msg}
                            isMe={isMe}
                            bubbleColor={isMe ? "bg-green-700" : colors.bg}
                            textColor={isMe ? "text-white" : colors.text}
                            showName={!isMe}
                        >
                            {isMeetingAlert ? (
                                <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded-md">
                                    <p className="font-semibold text-blue-900">
                                        Video meeting started.
                                    </p>
                                    <a
                                        href={msg.message_text}
                                        target="_blank"
                                        className="inline-block mt-2 text-blue-600 underline font-bold"
                                    >
                                        Join Meeting
                                    </a>
                                </div>
                            ) : (
                                <p>{msg.message_text}</p>
                            )}
                        </ChatBubble>
                    );
                })}
                <div ref={scrollRef} />
            </div>

            {/* Input Form */}
            <form
                onSubmit={sendMessage}
                className="p-4 md:p-6 border-t flex gap-2 md:gap-4 bg-slate-850/50"
            >
                <input
                    className="flex-1 border rounded-full px-4 md:px-6 py-2 md:py-3 text-sm md:text-lg outline-none bg-slate-600 text-slate-100 border-gray-300 focus:ring-green-500 focus:border-green-500"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Message..."
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 md:px-8 py-2 md:py-3 rounded-full font-bold text-sm md:text-base"
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
                        className="w-full mb-4 border rounded p-2 text-black"
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
