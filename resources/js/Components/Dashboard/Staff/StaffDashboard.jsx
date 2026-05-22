import React from "react";
import ProjectUpdatesIndex from "@/Components/Dashboard/Shared/Updates/Index";

export default function StaffDashboard({ auth, projects, projectUpdates }) {
    return (
        <div className="space-y-6">
            {/* Field Surveyor Operations Terminal Header */}
            <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-white">
                    Field Survey Operations Terminal
                </h3>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                    Select assigned project profiles below to post geological
                    updates or view recent pipeline entries.
                </p>
            </div>

            {/* Main Interactive Logging Workspace */}
            <ProjectUpdatesIndex
                projects={projects}
                projectUpdates={projectUpdates}
            />
        </div>
    );
}
