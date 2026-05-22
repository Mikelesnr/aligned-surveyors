import React from "react";

export default function UpdatesTimelineList({ updates }) {
    if (updates.length === 0) {
        return (
            <div className="p-8 text-center text-zinc-500 font-mono text-xs uppercase tracking-wider">
                No progress log entries reported under this criteria.
            </div>
        );
    }

    return (
        <div className="divide-y divide-zinc-900 bg-zinc-900/30 border border-zinc-800/60 rounded-xl overflow-hidden shadow-2xl">
            {updates.map((update) => (
                <div
                    key={update.id}
                    className="p-4 hover:bg-zinc-900/10 transition-colors space-y-2"
                >
                    <div className="flex items-center justify-between gap-4">
                        <span className="font-sans text-xs font-semibold text-green-400">
                            {update.project?.project_title ||
                                "Unmapped Assignment"}
                        </span>
                        <span className="font-mono text-[10px] text-zinc-500">
                            {new Date(update.created_at).toLocaleDateString()}{" "}
                            at{" "}
                            {new Date(update.created_at).toLocaleTimeString(
                                [],
                                { hour: "2-digit", minute: "2-digit" },
                            )}
                        </span>
                    </div>

                    <p className="text-zinc-300 font-sans text-xs leading-relaxed">
                        {update.update_text}
                    </p>

                    <div className="pt-1 flex items-center gap-1.5">
                        <span className="text-[10px] text-zinc-500 font-mono uppercase">
                            Surveyor:
                        </span>
                        <span className="text-[10px] text-zinc-400 font-mono bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800/80">
                            {update.user?.name || "System Account"}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
