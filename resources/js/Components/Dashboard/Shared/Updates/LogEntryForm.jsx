import React from "react";
import { useForm } from "@inertiajs/react";

export default function LogEntryForm({ projects }) {
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
        <div className="bg-zinc-900/30 border border-zinc-800/60 rounded-xl p-5 shadow-2xl sticky top-6">
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-white mb-3">
                File Field Tracking Entry
            </h4>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider mb-1">
                        Active Project Target
                    </label>
                    <select
                        value={data.project_id}
                        onChange={(e) => setData("project_id", e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-white font-mono focus:border-green-500 focus:outline-none"
                        required
                    >
                        <option value="">Select Project Assignment...</option>
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
                        Log Notes & Metrics
                    </label>
                    <textarea
                        rows="4"
                        placeholder="Log current site specifications, geological updates, or team variations..."
                        value={data.update_text}
                        onChange={(e) => setData("update_text", e.target.value)}
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
                    {processing ? "Transmitting..." : "Commit Stream Log"}
                </button>
            </form>
        </div>
    );
}
