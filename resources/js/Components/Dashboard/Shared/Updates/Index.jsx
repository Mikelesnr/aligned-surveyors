import React, { useState } from "react";
import UpdatesTimelineList from "./UpdatesTimelineList";
import LogEntryForm from "./LogEntryForm";

// Guard props using array fallbacks directly in the arguments signature
export default function ProjectUpdatesIndex({
    projects = [],
    projectUpdates = [],
}) {
    const [selectedProjectId, setSelectedProjectId] = useState("all");

    // Interactive safe filter parsing fallback
    const filteredUpdates =
        selectedProjectId === "all"
            ? projectUpdates
            : projectUpdates.filter(
                  (update) => update.project_id === selectedProjectId,
              );

    return (
        <div className="space-y-6">
            {/* Project Quick-Filter Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-zinc-900/20 p-4 border border-zinc-900 rounded-lg">
                <div>
                    <h3 className="text-sm font-bold uppercase font-mono tracking-wide">
                        Project Timelines
                    </h3>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                        Track and report site updates across operational
                        assignments.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-500 font-mono uppercase whitespace-nowrap">
                        Filter Logs:
                    </span>
                    <select
                        value={selectedProjectId}
                        onChange={(e) => setSelectedProjectId(e.target.value)}
                        className="bg-zinc-950 border border-zinc-800 rounded p-1.5 text-xs text-white font-mono focus:border-green-500 focus:outline-none min-w-[220px]"
                    >
                        <option value="all">All Shared Assignments Logs</option>
                        {projects.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.project_title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Split layout execution grid container */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <UpdatesTimelineList updates={filteredUpdates} />
                </div>
                <div>
                    <LogEntryForm projects={projects} />
                </div>
            </div>
        </div>
    );
}
