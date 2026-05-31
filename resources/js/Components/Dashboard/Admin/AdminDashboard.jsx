import { useState, useEffect } from "react"; // Added useEffect
import axios from "axios"; // Added axios
import UserManagement from "./UserManagement";
import ServiceManagement from "./ServiceManagement";
import ClientManagement from "./ClientManagement";
import ProjectManagement from "./ProjectManagement";
import ProjectUpdatesIndex from "@/Components/Dashboard/Shared/Updates/Index";

export default function AdminDashboard({
    auth,
    services,
    clients,
    projects,
    projectUpdates,
}) {
    const [activeTab, setActiveTab] = useState("users");
    const [fetchedUsers, setFetchedUsers] = useState([]); // Local state for fetched users

    // Fetch users independently from the admin index route
    useEffect(() => {
        axios
            .get(route("admin.users.index"))
            .then((response) => {
                const data = response.data.users || response.data;
                console.log("Fetched Admin Users:", data); // Log to verify
                setFetchedUsers(data);
            })
            .catch((error) => console.error("Error fetching users:", error));
    }, []);

    return (
        <div className="space-y-6">
            {/* Flat Navigation Tabs */}
            <div className="flex border-b border-zinc-850 gap-2 overflow-x-auto pb-px">
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
                    // Pass the locally fetched 'fetchedUsers' instead of the prop
                    <UserManagement auth={auth} users={fetchedUsers} />
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
