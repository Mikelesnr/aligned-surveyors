import { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function ProjectManagement({ projects, services, clients }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm({
        service_id: "",
        client_id: "",
        project_title: "",
        status: "active",
    });

    const openCreateMode = () => {
        clearErrors();
        reset();
        setEditingProject(null);
        setIsFormOpen(true);
    };

    const openEditMode = (project) => {
        clearErrors();
        setEditingProject(project);
        setData({
            service_id: project.service_id,
            client_id: project.client_id,
            project_title: project.project_title,
            status: project.status ? project.status.toLowerCase() : "active",
            is_visible: !!project.is_visible,
        });
        setIsFormOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingProject) {
            put(route("admin.projects.update", editingProject.id), {
                onSuccess: () => {
                    setIsFormOpen(false);
                    reset();
                },
            });
        } else {
            post(route("admin.projects.store"), {
                onSuccess: () => {
                    setIsFormOpen(false);
                    reset();
                },
            });
        }
    };

    return (
        <div className="space-y-4">
            {/* View Layout Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-zinc-900/20 p-4 border border-zinc-900 rounded-lg">
                <div>
                    <h3 className="text-sm font-bold uppercase font-mono tracking-wide">
                        Contracts Repository
                    </h3>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                        Track active and completed surveying contracts.
                    </p>
                </div>
                <button
                    onClick={openCreateMode}
                    className="bg-green-600 hover:bg-green-500 text-black font-mono font-bold text-[11px] uppercase tracking-widest py-2 px-4 rounded transition-all"
                >
                    + Log Project Profile
                </button>
            </div>

            {/* Records Data Table Container */}
            <div className="bg-zinc-900/30 border border-zinc-800/60 rounded-xl overflow-hidden shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-800 bg-zinc-900/50 font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                            <th className="py-3 px-6">Project Context Title</th>
                            <th className="py-3 px-6">Client</th>
                            <th className="py-3 px-6">Service Area</th>
                            <th className="py-3 px-6">Lifecycle Status</th>
                            <th className="py-3 px-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900 text-xs text-zinc-300 font-mono">
                        {projects.map((project) => (
                            <tr
                                key={project.id}
                                className="hover:bg-zinc-900/20 transition-colors"
                            >
                                <td className="py-3 px-6 font-sans text-sm font-medium text-white">
                                    {project.project_title}
                                </td>
                                <td className="py-3 px-6 text-zinc-400 font-sans text-sm">
                                    {project.client?.name}
                                </td>
                                <td className="py-3 px-6 text-zinc-400 font-sans text-sm">
                                    {project.service?.title}
                                </td>
                                <td className="py-3 px-6">
                                    <span
                                        className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                                            project.status.toLowerCase() ===
                                            "active"
                                                ? "bg-amber-950/40 text-amber-400 border border-amber-900/40"
                                                : "bg-green-950/40 text-green-400 border border-green-900/30"
                                        }`}
                                    >
                                        {project.status}
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-right space-x-3">
                                    <button
                                        onClick={() => openEditMode(project)}
                                        className="text-zinc-400 hover:text-white uppercase text-[10px] font-bold"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (confirm("Delete contract log?"))
                                                destroy(
                                                    route(
                                                        "admin.projects.destroy",
                                                        project.id,
                                                    ),
                                                );
                                        }}
                                        className="text-red-500 hover:text-red-400 uppercase text-[10px] font-bold"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Form Overlay Component */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-2xl">
                        <h4 className="text-sm font-bold uppercase font-mono tracking-wide text-white mb-4">
                            {editingProject
                                ? "Modify Project Attributes"
                                : "Log Contract Parameters"}
                        </h4>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider mb-1">
                                    Contract Designation Title
                                </label>
                                <input
                                    type="text"
                                    value={data.project_title}
                                    onChange={(e) =>
                                        setData("project_title", e.target.value)
                                    }
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-white"
                                    required
                                />
                                {errors.project_title && (
                                    <div className="text-red-500 text-[10px] mt-1 font-mono">
                                        {errors.project_title}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider mb-1">
                                    Target Account Client
                                </label>
                                <select
                                    value={data.client_id}
                                    onChange={(e) =>
                                        setData("client_id", e.target.value)
                                    }
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-white font-mono"
                                    required
                                >
                                    <option value="">
                                        Select Account Owner...
                                    </option>
                                    {clients.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.client_id && (
                                    <div className="text-red-500 text-[10px] mt-1 font-mono">
                                        {errors.client_id}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider mb-1">
                                    Assigned Survey Discipline
                                </label>
                                <select
                                    value={data.service_id}
                                    onChange={(e) =>
                                        setData("service_id", e.target.value)
                                    }
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-white font-mono"
                                    required
                                >
                                    <option value="">
                                        Select Operational Field...
                                    </option>
                                    {services.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.title}
                                        </option>
                                    ))}
                                </select>
                                {errors.service_id && (
                                    <div className="text-red-500 text-[10px] mt-1 font-mono">
                                        {errors.service_id}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider mb-1">
                                    Contract Lifecycle Status
                                </label>
                                <select
                                    value={data.status} // Ensure it never defaults to an empty string
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-white font-mono"
                                >
                                    <option value="active">
                                        Active Operations
                                    </option>
                                    <option value="completed">
                                        Completed Contract Archive
                                    </option>
                                </select>
                                {errors.status && (
                                    <div className="text-red-500 text-[10px] mt-1 font-mono">
                                        {errors.status}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.is_visible}
                                        onChange={(e) =>
                                            setData(
                                                "is_visible",
                                                e.target.checked,
                                            )
                                        }
                                        className="rounded bg-zinc-950 border-zinc-800 text-green-600 focus:ring-green-500"
                                    />
                                    <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                                        Display on Public Site
                                    </span>
                                </label>
                                {errors.is_visible && (
                                    <div className="text-red-500 text-[10px] mt-1 font-mono">
                                        {errors.is_visible}
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="text-zinc-400 hover:text-white font-mono text-[11px] uppercase font-bold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-green-600 text-black font-mono text-[11px] uppercase font-bold px-4 py-1.5 rounded"
                                >
                                    {processing ? "Saving..." : "Commit Record"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
