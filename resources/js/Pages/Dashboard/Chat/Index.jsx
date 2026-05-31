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
            <div className="h-[calc(100vh-64px)] flex bg-slate-950/90 overflow-hidden relative">
                {/* Mobile: Sidebar covers full screen if no active target, otherwise hidden */}
                <div
                    className={`${activeTarget.data ? "hidden md:flex" : "flex"} w-full md:w-80 border-r border-gray-200 flex flex-col bg-white md:bg-transparent`}
                >
                    <div className="p-4 border-b flex justify-between items-center">
                        <h2 className="text-lg font-bold">Messages</h2>
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
                                className="w-full text-left px-4 py-3 hover:bg-gray-100"
                            >
                                <p className="font-semibold">
                                    {convo.recipient?.name}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content: Hidden on mobile if no active conversation */}
                <div
                    className={`${activeTarget.data ? "flex" : "hidden md:flex"} flex-1 bg-slate-900/50`}
                >
                    {activeTarget.data ? (
                        <div className="flex flex-col w-full">
                            <button
                                className="md:hidden p-2 text-white"
                                onClick={() =>
                                    setActiveTarget({ type: null, data: null })
                                }
                            >
                                ← Back
                            </button>
                            <PeerChatWindow
                                auth={auth}
                                conversation={activeTarget.data}
                                key={activeTarget.data.id}
                            />
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-400">
                            Select a chat
                        </div>
                    )}
                </div>
            </div>
            {/* Modal remains the same */}
        </AuthenticatedLayout>
    );
}
