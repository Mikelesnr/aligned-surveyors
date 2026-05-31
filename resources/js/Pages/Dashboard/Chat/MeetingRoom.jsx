import React, { useState, useEffect, useRef } from "react";
import { Link } from "@inertiajs/react";
import axios from "axios";
import MeetingChatWindow from "@/Components/Chat/MeetingChatWindow";

export default function MeetingRoom({ group, meetingId, auth }) {
    const jitsiContainer = useRef(null);
    const [isChatOpen, setIsChatOpen] = useState(false); // Default to false on mobile/small screens

    useEffect(() => {
        axios
            .get(route("jitsi.token", { room: meetingId }))
            .then((response) => {
                const { token } = response.data;
                const domain = "8x8.vc";
                const options = {
                    roomName: `vpaas-magic-cookie-e7e43f255f13435eaca8d25543865bc6/${meetingId}`,
                    parentNode: jitsiContainer.current,
                    jwt: token,
                    width: "100%",
                    height: "100%",
                    configOverwrite: { prejoinPageEnabled: false },
                    interfaceConfigOverwrite: {
                        TOOLBAR_BUTTONS: [
                            "microphone",
                            "camera",
                            "desktop",
                            "fullscreen",
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
                return () => api.dispose();
            })
            .catch((err) => console.error("Failed to get Jitsi token", err));
    }, [meetingId]);

    return (
        <div className="h-screen flex flex-col md:flex-row">
            {/* Video Area */}
            <div className="flex-1 bg-black relative">
                <div ref={jitsiContainer} className="w-full h-full" />
                <Link
                    href={route("chat.group.show", group.id)}
                    className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1.5 rounded shadow-lg z-10 text-sm"
                >
                    Leave
                </Link>
                <button
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded shadow-lg z-10 text-sm"
                >
                    {isChatOpen ? "Hide Chat" : "Chat"}
                </button>
            </div>

            {/* Custom Chat Sidebar: Overlays on mobile */}
            {isChatOpen && (
                <div className="fixed md:relative inset-0 z-20 bg-white md:w-80 border-l border-gray-200 transition-all duration-300">
                    <MeetingChatWindow group={group} auth={auth} />
                    <button
                        onClick={() => setIsChatOpen(false)}
                        className="md:hidden absolute top-2 right-2 p-2 bg-gray-200 rounded-full"
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
}
