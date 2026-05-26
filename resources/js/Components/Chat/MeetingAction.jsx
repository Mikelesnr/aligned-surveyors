import React from "react";
import axios from "axios";

export default function MeetingAction({ group, isPersonnel }) {
    const handleStartMeeting = async () => {
        try {
            // Sends request to trigger the broadcast and generate the message
            const response = await axios.post(
                route("groups.meeting.start", group.id),
            );

            console.log("Meeting started with ID:", response.data.meetingId);

            // Redirect the user who clicked the button to the meeting room
            window.location.href = route("groups.meeting.show", {
                group: group.id,
                meetingId: response.data.meetingId,
            });
        } catch (error) {
            console.error("Meeting initiation failed:", error);
            alert("Could not start meeting. Please try again.");
        }
    };

    if (!isPersonnel) return null;

    return (
        <button
            onClick={handleStartMeeting}
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition"
            target="_blank"
        >
            Start Meeting
        </button>
    );
}
