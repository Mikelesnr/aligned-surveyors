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
            <div className="h-[calc(100vh-64px)] flex bg-white overflow-hidden">
                <div className="w-80 border-r border-gray-200 flex flex-col bg-gray-50">
                    <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-white">
                        <h2 className="text-xl font-bold">Messages</h2>
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
                <div className="flex-1 bg-white">
                    {activeTarget.data ? (
                        <PeerChatWindow
                            auth={auth}
                            conversation={activeTarget.data}
                            key={activeTarget.data.id}
                        />
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-400">
                            Select a chat
                        </div>
                    )}
                </div>
            </div>
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
