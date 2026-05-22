import { useState } from "react";
import UserManagement from "./UserManagement";
import ServiceManagement from "./ServiceManagement";
import ClientManagement from "./ClientManagement";
import ProjectManagement from "./ProjectManagement";
import ProjectUpdatesIndex from "@/Components/Dashboard/Shared/Updates/Index";

export default function AdminDashboard({
    auth,
    users,
    services,
    clients,
    projects,
    projectUpdates, // Ensure this prop is received from parent Pages/Dashboard.jsx
}) {
    // Keep 'users' as the default landing view
    const [activeTab, setActiveTab] = useState("users");

    return (
        <div className="space-y-6">
            {/* Flat Navigation Tabs */}
            <div className="flex border-b border-zinc-850 gap-2 overflow-x-auto pb-px">
                {/* Added 'updates' cleanly to the tabs array mapping */}
                {["users", "services", "clients", "projects", "updates"].map(
                    (tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`font-mono text-xs uppercase tracking-wider py-3 px-4 border-b-2 font-bold transition-all whitespace-nowrap ${
                                activeTab === tab
                                    ? "border-green-500 text-white bg-zinc-900/40"
                                    : "border-transparent text-zinc-500 hover:text-zinc-300"
                            }`}
                        >
                            {tab === "updates"
                                ? "Project Streams"
                                : `${tab} Management`}
                        </button>
                    ),
                )}
            </div>

            {/* Render selected workspace */}
            <div className="animate-fade-in">
                {activeTab === "users" && (
                    <UserManagement auth={auth} users={users} />
                )}
                {activeTab === "services" && (
                    <ServiceManagement services={services} />
                )}
                {activeTab === "clients" && (
                    <ClientManagement clients={clients} />
                )}
                {activeTab === "projects" && (
                    <ProjectManagement
                        projects={projects}
                        services={services}
                        clients={clients}
                    />
                )}
                {activeTab === "updates" && (
                    <ProjectUpdatesIndex
                        projects={projects}
                        projectUpdates={projectUpdates}
                    />
                )}
            </div>
        </div>
    );
}
