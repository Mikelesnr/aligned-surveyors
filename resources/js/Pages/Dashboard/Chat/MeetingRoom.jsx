// resources/js/Pages/Dashboard/Chat/MeetingRoom.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "@inertiajs/react";
import axios from "axios";
import MeetingChatWindow from "@/Components/Chat/MeetingChatWindow";

export default function MeetingRoom({ group, meetingId, auth }) {
    const jitsiContainer = useRef(null);
    const [isChatOpen, setIsChatOpen] = useState(true);

    useEffect(() => {
        // 1. Fetch the JWT from your new Laravel backend route
        axios
            .get(route("jitsi.token", { room: meetingId }))
            .then((response) => {
                const { token } = response.data;

                // 2. Initialize the API
                const domain = "8x8.vc";
                const options = {
                    roomName: `vpaas-magic-cookie-e7e43f255f13435eaca8d25543865bc6/${meetingId}`,
                    parentNode: jitsiContainer.current,
                    jwt: token,
                    width: "100%",
                    height: "100%",
                    configOverwrite: {
                        prejoinPageEnabled: false, // This kills the login/signup screen
                    },
                    interfaceConfigOverwrite: {
                        // This removes the chat button so users only use your custom sidebar
                        TOOLBAR_BUTTONS: [
                            "microphone",
                            "camera",
                            "desktop",
                            "fullscreen",
                            "fodeviceselection",
                            "hangup",
                            "profile",
                            "settings",
                            "raisehand",
                            "videoquality",
                            "tileview",
                        ],
                    },
                };

                const api = new window.JitsiMeetExternalAPI(domain, options);

                // 3. Cleanup on unmount
                return () => api.dispose();
            })
            .catch((err) => console.error("Failed to get Jitsi token", err));
    }, [meetingId]);

    return (
        <div className="h-screen flex">
            {/* Video Area */}
            <div className="flex-1 bg-black relative">
                {/* Jitsi will inject the video here */}
                <div ref={jitsiContainer} className="w-full h-full" />

                <Link
                    href={route("chat.group.show", group.id)}
                    className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded shadow-lg z-10"
                >
                    Leave Meeting
                </Link>

                <button
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded shadow-lg z-10"
                >
                    {isChatOpen ? "Hide Chat" : "Show Chat"}
                </button>
            </div>

            {/* Your Custom Chat Sidebar */}
            {isChatOpen && (
                <div className="w-80 border-l border-gray-200 bg-white transition-all duration-300">
                    <MeetingChatWindow group={group} auth={auth} />
                </div>
            )}
        </div>
    );
}
