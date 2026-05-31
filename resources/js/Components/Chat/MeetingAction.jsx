import React from "react";
import axios from "axios";
import Dropdown from "@/Components/Dropdown";

export default function MeetingAction({
    group,
    isPersonnel,
    isGroupAdmin,
    onAddMember,
}) {
    const handleStartMeeting = async () => {
        try {
            const response = await axios.post(
                route("groups.meeting.start", group.id),
            );
            window.location.href = route("groups.meeting.show", {
                group: group.id,
                meetingId: response.data.meetingId,
            });
        } catch (error) {
            console.error("Meeting initiation failed:", error);
            alert("Could not start meeting.");
        }
    };

    return (
        <div className="flex items-center">
            {/* Desktop: Standard Buttons */}
            <div className="hidden md:flex gap-2">
                {isPersonnel && (
                    <button
                        onClick={handleStartMeeting}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
                    >
                        Start Meeting
                    </button>
                )}
                {isGroupAdmin && (
                    <button
                        onClick={onAddMember}
                        className="bg-slate-600 text-slate-100 px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                    >
                        + Add Member
                    </button>
                )}
            </div>

            {/* Mobile: Dropdown Hamburger Menu */}
            <div className="md:hidden">
                <Dropdown>
                    <Dropdown.Trigger>
                        <button className="p-2 text-slate-300 hover:text-white border border-slate-700 rounded-lg">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </button>
                    </Dropdown.Trigger>

                    {/* Added z-50 and bg-slate-800 to ensure visibility */}
                    <Dropdown.Content
                        width="48"
                        contentClasses="py-1 bg-slate-800 border border-slate-700"
                    >
                        {isPersonnel && (
                            <button
                                onClick={handleStartMeeting}
                                className="block w-full text-left px-4 py-3 text-sm text-white hover:bg-slate-700"
                            >
                                Start Meeting
                            </button>
                        )}
                        {isGroupAdmin && (
                            <button
                                onClick={onAddMember}
                                className="block w-full text-left px-4 py-3 text-sm text-white hover:bg-slate-700"
                            >
                                Add Member
                            </button>
                        )}
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </div>
    );
}
