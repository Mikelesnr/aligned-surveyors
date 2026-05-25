// resources/js/Pages/Dashboard/Chat/Groups.jsx
import React from "react";
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
    return (
        <AuthenticatedLayout>
            <Head title="Group Workspace" />

            <div className="h-[calc(100vh-64px)] flex bg-white overflow-hidden">
                {/* Sidebar maintains state for My Channels and Discover */}
                <GroupSidebar
                    groups={myGroups}
                    publicGroups={publicGroups}
                    activeGroupId={activeGroup?.id}
                />

                {/* Main Content Area */}
                <div className="flex-1 bg-gray-50">
                    {activeGroup ? (
                        <GroupChatWindow
                            group={activeGroup}
                            auth={auth}
                            isGroupAdmin={isGroupAdmin}
                            availableUsers={availableUsers}
                        />
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-400">
                            Select a channel to begin broadcasting.
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
