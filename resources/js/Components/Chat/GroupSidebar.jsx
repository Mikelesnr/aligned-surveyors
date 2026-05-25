import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";

export default function GroupSidebar({ groups, publicGroups, activeGroupId }) {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, post, processing, reset } = useForm({
        name: "",
        is_private: false, // Restored the checkbox state
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("groups.store"), {
            onSuccess: () => {
                setShowModal(false);
                reset();
            },
        });
    };

    return (
        <div className="w-full md:w-80 border-r border-gray-200 flex flex-col bg-white h-full shrink-0">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <h2 className="font-bold text-gray-700 uppercase tracking-wide text-xs">
                    My Groups
                </h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="text-green-600 hover:bg-green-100 p-2 rounded-full transition-colors"
                    title="Create Group"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto py-2">
                {/* My Groups List */}
                <div className="mb-6">
                    {groups.map((group) => (
                        <Link
                            key={group.id}
                            href={route("chat.group.show", group.id)}
                            className={`block px-6 py-2 transition-colors ${
                                activeGroupId === group.id
                                    ? "bg-green-50 text-green-700 font-semibold"
                                    : "text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                            #{group.name}
                        </Link>
                    ))}
                </div>

                {/* Discover Section */}
                <div className="border-t border-gray-200 pt-4">
                    <h3 className="px-6 font-bold text-gray-400 text-xs uppercase tracking-wider mb-3">
                        Discover
                    </h3>
                    {publicGroups.map((group) => (
                        <div
                            key={group.id}
                            className="flex justify-between items-center px-6 py-2 group"
                        >
                            <span className="text-sm text-gray-600">
                                #{group.name}
                            </span>
                            <button
                                onClick={() =>
                                    post(route("groups.join", group.id))
                                }
                                className="text-xs bg-gray-50 hover:bg-green-600 hover:text-white text-gray-600 px-3 py-1 rounded-full transition-all"
                            >
                                Join
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Create Group Modal */}
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <form onSubmit={submit} className="p-6">
                    <h2 className="text-lg font-bold mb-4 text-gray-800">
                        Create New Group
                    </h2>
                    <input
                        type="text"
                        placeholder="Group Name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full mb-4 border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                        required
                    />
                    {/* Restored Privacy Checkbox */}
                    <label className="flex items-center mb-6 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={data.is_private}
                            onChange={(e) =>
                                setData("is_private", e.target.checked)
                            }
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                            Private Group
                        </span>
                    </label>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
