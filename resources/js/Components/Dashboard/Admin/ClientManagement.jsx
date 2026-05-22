import { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function ClientManagement({ clients }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingClient, setEditingClient] = useState(null);

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
        name: "",
        is_visible: true,
    });

    const openCreateMode = () => {
        clearErrors();
        reset();
        setEditingClient(null);
        setIsFormOpen(true);
    };

    const openEditMode = (client) => {
        clearErrors();
        setEditingClient(client);
        setData({ name: client.name, is_visible: client.is_visible });
        setIsFormOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingClient) {
            put(route("admin.clients.update", editingClient.id), {
                onSuccess: () => {
                    setIsFormOpen(false);
                    reset();
                },
            });
        } else {
            post(route("admin.clients.store"), {
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
                        Client Ledger
                    </h3>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                        Control corporate account display visibilities.
                    </p>
                </div>
                <button
                    onClick={openCreateMode}
                    className="bg-green-600 hover:bg-green-500 text-black font-mono font-bold text-[11px] uppercase tracking-widest py-2 px-4 rounded transition-all"
                >
                    + Register Client
                </button>
            </div>

            <div className="bg-zinc-900/30 border border-zinc-800/60 rounded-xl overflow-hidden shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-800 bg-zinc-900/50 font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                            <th className="py-3 px-6">Client Identity</th>
                            <th className="py-3 px-6">Showcase Status</th>
                            <th className="py-3 px-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900 text-xs text-zinc-300 font-mono">
                        {clients.map((client) => (
                            <tr
                                key={client.id}
                                className="hover:bg-zinc-900/20 transition-colors"
                            >
                                <td className="py-3 px-6 font-sans text-sm font-medium text-white">
                                    {client.name}
                                </td>
                                <td className="py-3 px-6">
                                    <span
                                        className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                                            client.is_visible
                                                ? "bg-green-950/40 text-green-400 border border-green-900/30"
                                                : "bg-zinc-900 text-zinc-500 border border-zinc-800"
                                        }`}
                                    >
                                        {client.is_visible
                                            ? "Visible"
                                            : "Hidden"}
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-right space-x-3">
                                    <button
                                        onClick={() => openEditMode(client)}
                                        className="text-zinc-400 hover:text-white uppercase text-[10px] font-bold"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (
                                                confirm("Delete client record?")
                                            )
                                                destroy(
                                                    route(
                                                        "admin.clients.destroy",
                                                        client.id,
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
                            {editingClient
                                ? "Update Corporate Stakeholder"
                                : "Initialize Client Record"}
                        </h4>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider mb-1">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider mb-1">
                                    Public Display Flag
                                </label>
                                <select
                                    value={data.is_visible}
                                    onChange={(e) =>
                                        setData(
                                            "is_visible",
                                            e.target.value === "true",
                                        )
                                    }
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-white font-mono"
                                >
                                    <option value="true">
                                        Include on Marketing Matrix
                                    </option>
                                    <option value="false">
                                        Restrict to Backend Records
                                    </option>
                                </select>
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
