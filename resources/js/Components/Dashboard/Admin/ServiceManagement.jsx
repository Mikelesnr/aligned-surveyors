import { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function ServiceManagement({ services }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);

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
        title: "",
        description: "",
    });

    const openCreateMode = () => {
        clearErrors();
        reset();
        setEditingService(null);
        setIsFormOpen(true);
    };

    const openEditMode = (service) => {
        clearErrors();
        setEditingService(service);
        setData({ title: service.title, description: service.description });
        setIsFormOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingService) {
            put(route("admin.services.update", editingService.id), {
                onSuccess: () => {
                    setIsFormOpen(false);
                    reset();
                },
            });
        } else {
            post(route("admin.services.store"), {
                onSuccess: () => {
                    setIsFormOpen(false);
                    reset();
                },
            });
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-zinc-900/20 p-4 border border-zinc-900 rounded-lg">
                <div>
                    <h3 className="text-sm font-bold uppercase font-mono tracking-wide">
                        Capabilities Registry
                    </h3>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                        Manage operational surveying specialties.
                    </p>
                </div>
                <button
                    onClick={openCreateMode}
                    className="bg-green-600 hover:bg-green-500 text-black font-mono font-bold text-[11px] uppercase tracking-widest py-2 px-4 rounded transition-all"
                >
                    + Add Capability
                </button>
            </div>

            <div className="bg-zinc-900/30 border border-zinc-800/60 rounded-xl overflow-hidden shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-800 bg-zinc-900/50 font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                            <th className="py-3 px-6">Title</th>
                            <th className="py-3 px-6">Slug URL Identifier</th>
                            <th className="py-3 px-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900 text-xs text-zinc-300 font-mono">
                        {services.map((service) => (
                            <tr
                                key={service.id}
                                className="hover:bg-zinc-900/20 transition-colors"
                            >
                                <td className="py-3 px-6 font-sans text-sm font-medium text-white">
                                    {service.title}
                                </td>
                                <td className="py-3 px-6 text-zinc-400 font-mono text-xs">
                                    {service.slug}
                                </td>
                                <td className="py-3 px-6 text-right space-x-3">
                                    <button
                                        onClick={() => openEditMode(service)}
                                        className="text-zinc-400 hover:text-white uppercase text-[10px] font-bold"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (confirm("Remove service?"))
                                                destroy(
                                                    route(
                                                        "admin.services.destroy",
                                                        service.id,
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

            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-2xl">
                        <h4 className="text-sm font-bold uppercase font-mono tracking-wide text-white mb-4">
                            {editingService
                                ? "Edit Service Specification"
                                : "Initialize Service Context"}
                        </h4>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider mb-1">
                                    Service Title
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider mb-1">
                                    Description Matrix
                                </label>
                                <textarea
                                    rows="4"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-white"
                                    required
                                />
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
