import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import GroupSidebar from "@/Components/Chat/GroupSidebar";
import GroupChatWindow from "@/Components/Chat/GroupChatWindow";

export default function Groups({
    auth,
    myGroups,
    publicGroups,
    activeGroup,
    isGroupAdmin,
    availableUsers,
}) {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <AuthenticatedLayout>
            <Head title="Group Workspace" />
            <div className="h-[calc(100vh-64px)] flex bg-slate-950/90 overflow-hidden relative">
                {/* Sidebar: Mobile overlay, Desktop static */}
                <div
                    className={`${showSidebar ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:relative z-20 w-80 h-full transition-transform duration-300 bg-slate-950 border-r border-gray-700`}
                >
                    <GroupSidebar
                        groups={myGroups}
                        publicGroups={publicGroups}
                        activeGroupId={activeGroup?.id}
                    />
                    <button
                        className="md:hidden absolute top-4 -right-10 bg-slate-800 p-2 text-white"
                        onClick={() => setShowSidebar(!showSidebar)}
                    >
                        {showSidebar ? "<<" : ">>"}
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-slate-900/50 relative">
                    {!showSidebar && !activeGroup && (
                        <button
                            className="md:hidden m-4 p-2 bg-blue-600 text-white rounded"
                            onClick={() => setShowSidebar(true)}
                        >
                            Open Channels
                        </button>
                    )}
                    {activeGroup ? (
                        <GroupChatWindow
                            group={activeGroup}
                            auth={auth}
                            isGroupAdmin={isGroupAdmin}
                            availableUsers={availableUsers}
                        />
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-400">
                            Select a channel.
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
