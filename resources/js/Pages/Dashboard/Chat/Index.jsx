import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import PeerChatWindow from "./Partials/PeerChatWindow";
import Modal from "@/Components/Modal";
import axios from "axios";

export default function Index({ auth, contacts }) {
    const [conversations, setConversations] = useState([]);
    const [activeTarget, setActiveTarget] = useState({
        type: null,
        data: null,
    });
    const [showNewChatModal, setShowNewChatModal] = useState(false);

    useEffect(() => {
        axios
            .get(route("chat.conversation.index"))
            .then((res) => setConversations(res.data));
    }, []);

    const handleCreateChat = (contactId) => {
        axios
            .post(route("chat.conversation.store"), { recipient_id: contactId })
            .then((res) => {
                setConversations((prev) => [res.data, ...prev]);
                setActiveTarget({ type: "peer", data: res.data });
                setShowNewChatModal(false);
            });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Communications" />

            {/* Main container: Full height, flex row */}
            <div className="h-[calc(100vh-64px)] flex bg-slate-950/90 overflow-hidden relative">
                {/* Sidebar: w-full on mobile, fixed w-80 on desktop. Hidden when an active chat exists on mobile. */}
                <div
                    className={`${activeTarget.data ? "hidden md:flex" : "flex"} w-full md:w-80 border-r border-gray-700 flex flex-col bg-white md:bg-transparent`}
                >
                    <div className="p-6 border-b border-gray-200 md:border-gray-700 flex justify-between items-center">
                        <h2 className="text-xl font-bold md:text-white">
                            Messages
                        </h2>
                        <button
                            onClick={() => setShowNewChatModal(true)}
                            className="text-blue-600 font-bold"
                        >
                            + New
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {conversations.map((convo) => (
                            <button
                                key={convo.id}
                                onClick={() =>
                                    setActiveTarget({
                                        type: "peer",
                                        data: convo,
                                    })
                                }
                                className="w-full text-left px-4 py-3 hover:bg-gray-100 md:hover:bg-gray-800 md:text-white border-b border-gray-100 md:border-gray-800"
                            >
                                <p className="font-semibold">
                                    {convo.recipient?.name}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content Area: Flex-1. Hidden on mobile if no conversation selected. */}
                <div
                    className={`${activeTarget.data ? "flex" : "hidden md:flex"} flex-1 flex-col bg-slate-900/50`}
                >
                    {activeTarget.data ? (
                        <>
                            {/* Mobile Back Button: Only visible on mobile */}
                            <button
                                className="md:hidden p-4 text-blue-400 font-bold border-b border-gray-700"
                                onClick={() =>
                                    setActiveTarget({ type: null, data: null })
                                }
                            >
                                ← Back to Messages
                            </button>
                            <PeerChatWindow
                                auth={auth}
                                conversation={activeTarget.data}
                                key={activeTarget.data.id}
                            />
                        </>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-400">
                            Select a chat to start messaging
                        </div>
                    )}
                </div>
            </div>

            {/* Modal remains unchanged */}
            <Modal
                show={showNewChatModal}
                onClose={() => setShowNewChatModal(false)}
            >
                <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-4">
                        Start New Chat
                    </h3>
                    {contacts
                        .filter(
                            (c) =>
                                !conversations.find(
                                    (conv) => conv.recipient?.id === c.id,
                                ),
                        )
                        .map((contact) => (
                            <div
                                key={contact.id}
                                className="flex justify-between p-3 bg-zinc-800 rounded-lg mb-2"
                            >
                                <span className="text-white">
                                    {contact.name}
                                </span>
                                <button
                                    onClick={() => handleCreateChat(contact.id)}
                                    className="text-blue-500"
                                >
                                    Chat
                                </button>
                            </div>
                        ))}
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
