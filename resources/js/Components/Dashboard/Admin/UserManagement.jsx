import { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function UserManagement({ auth, users }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

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
        email: "",
        password: "",
        role: "staff",
    });

    const openCreateMode = () => {
        clearErrors();
        reset();
        setEditingUser(null);
        setIsFormOpen(true);
    };

    const openEditMode = (user) => {
        clearErrors();
        setEditingUser(user);
        setData({
            name: user.name,
            email: user.email,
            role: user.role,
            password: "",
        });
        setIsFormOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingUser) {
            put(route("admin.users.update", editingUser.id), {
                onSuccess: () => {
                    setIsFormOpen(false);
                    reset();
                },
            });
        } else {
            post(route("admin.users.store"), {
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
                        User Access Directory
                    </h3>
                    <p className="text-[11px] text-zinc-500 mt-0.5">
                        Control workspace clearance profiles.
                    </p>
                </div>
                <button
                    onClick={openCreateMode}
                    className="bg-green-600 hover:bg-green-500 text-black font-mono font-bold text-[11px] uppercase tracking-widest py-2 px-4 rounded transition-all"
                >
                    + Register Operator
                </button>
            </div>

            <div className="bg-zinc-900/30 border border-zinc-800/60 rounded-xl overflow-hidden shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-800 bg-zinc-900/50 font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                            <th className="py-3 px-6">Name</th>
                            <th className="py-3 px-6">Email Address</th>
                            <th className="py-3 px-6">Clearance</th>
                            <th className="py-3 px-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900 text-xs text-zinc-300 font-mono">
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="hover:bg-zinc-900/20 transition-colors"
                            >
                                <td className="py-3 px-6 font-sans text-sm font-medium text-white">
                                    {user.name}
                                </td>
                                <td className="py-3 px-6 text-zinc-400">
                                    {user.email}
                                </td>
                                <td>
                                    <span
                                        className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${
                                            user.role === "admin"
                                                ? "bg-red-950/20 text-red-400 border-red-900/40"
                                                : "bg-zinc-900 text-zinc-400 border-zinc-800"
                                        }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                                <td className="py-3 px-6 text-right space-x-3">
                                    <button
                                        onClick={() => openEditMode(user)}
                                        className="text-zinc-400 hover:text-white uppercase text-[10px] font-bold"
                                    >
                                        Edit
                                    </button>
                                    {auth.user.id !== user.id && (
                                        <button
                                            onClick={() => {
                                                if (confirm("Delete user?"))
                                                    destroy(
                                                        route(
                                                            "admin.users.destroy",
                                                            user.id,
                                                        ),
                                                    );
                                            }}
                                            className="text-red-500 hover:text-red-400 uppercase text-[10px] font-bold"
                                        >
                                            Remove
                                        </button>
                                    )}
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
                            {editingUser
                                ? "Modify Parameters"
                                : "Create Record Mapping"}
                        </h4>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider mb-1">
                                    Operator Name
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
                                    Email Destination
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider mb-1">
                                    Role Group
                                </label>
                                <select
                                    value={data.role}
                                    onChange={(e) =>
                                        setData("role", e.target.value)
                                    }
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-white font-mono"
                                >
                                    <option value="staff">
                                        Staff Operator
                                    </option>
                                    <option value="admin">
                                        Global Administrator
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider mb-1">
                                    Access Credentials
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-white"
                                    placeholder="••••••••"
                                    required={!editingUser}
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
