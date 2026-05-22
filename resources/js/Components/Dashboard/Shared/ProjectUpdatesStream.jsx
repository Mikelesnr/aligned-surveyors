import { useForm } from "@inertiajs/react";

export default function ProjectUpdatesStream({
    projects,
    projectUpdates,
    showForm = true,
}) {
    const { data, setData, post, processing, reset, errors } = useForm({
        project_id: "",
        update_text: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("project-updates.store"), {
            onSuccess: () => reset("update_text"),
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Timeline Stream Listing Column */}
            <div
                className={`${showForm ? "lg:col-span-2" : "lg:col-span-3"} space-y-4`}
            >
                <div className="bg-zinc-900/30 border border-zinc-800/60 rounded-xl overflow-hidden shadow-2xl">
                    <div className="bg-zinc-900/50 p-4 border-b border-zinc-800 font-mono text-xs uppercase tracking-wider text-zinc-400">
                        Operational Progress Streams
                    </div>

                    <div className="divide-y divide-zinc-900">
                        {projectUpdates.length === 0 ? (
                            <div className="p-8 text-center text-zinc-500 font-mono text-xs uppercase tracking-wider">
                                No historical tracking updates found in this
                                workspace.
                            </div>
                        ) : (
                            projectUpdates.map((update) => (
                                <div
                                    key={update.id}
                                    className="p-4 hover:bg-zinc-900/10 transition-colors space-y-2"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="font-sans text-xs font-semibold text-green-400">
                                            {update.project?.project_title ||
                                                "Unmapped Contract Project"}
                                        </span>
                                        <span className="font-mono text-[10px] text-zinc-500">
                                            {new Date(
                                                update.created_at,
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-zinc-300 font-sans text-xs leading-relaxed">
                                        {update.update_text}
                                    </p>
                                    <div className="pt-1 flex items-center gap-1.5">
                                        <span className="text-[10px] text-zinc-500 font-mono uppercase">
                                            Operator:
                                        </span>
                                        <span className="text-[10px] text-zinc-400 font-mono bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800/80">
                                            {update.user?.name || "System"}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Inline Creation Tool Box Panel */}
            {showForm && (
                <div className="space-y-4">
                    <div className="bg-zinc-900/30 border border-zinc-800/60 rounded-xl p-5 shadow-2xl sticky top-6">
                        <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-white mb-3">
                            File Workspace Progress Log
                        </h4>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider mb-1">
                                    Target Assignment Contract
                                </label>
                                <select
                                    value={data.project_id}
                                    onChange={(e) =>
                                        setData("project_id", e.target.value)
                                    }
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-white font-mono focus:border-green-500 focus:outline-none"
                                    required
                                >
                                    <option value="">Select Target...</option>
                                    {projects.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.project_title}
                                        </option>
                                    ))}
                                </select>
                                {errors.project_id && (
                                    <div className="text-red-500 font-mono text-[10px] mt-1">
                                        {errors.project_id}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider mb-1">
                                    Log Description entry
                                </label>
                                <textarea
                                    rows="4"
                                    placeholder="Enter survey findings, geological metrics, or project status modifications..."
                                    value={data.update_text}
                                    onChange={(e) =>
                                        setData("update_text", e.target.value)
                                    }
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-white placeholder-zinc-600 focus:border-green-500 focus:outline-none"
                                    required
                                />
                                {errors.update_text && (
                                    <div className="text-red-500 font-mono text-[10px] mt-1">
                                        {errors.update_text}
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-green-600 hover:bg-green-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-black font-mono font-bold text-[11px] uppercase tracking-widest py-2 rounded transition-all"
                            >
                                {processing
                                    ? "Transmitting..."
                                    : "Commit Stream Log"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
