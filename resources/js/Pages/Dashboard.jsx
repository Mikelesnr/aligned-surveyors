import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import AdminDashboard from "@/Components/Dashboard/Admin/AdminDashboard";
import StaffDashboard from "@/Components/Dashboard/Staff/StaffDashboard";

export default function Dashboard({
    auth,
    users,
    services,
    clients,
    projects,
    projectUpdates,
}) {
    const isAdminMode = auth.user.role === "admin";

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-mono font-bold uppercase tracking-wider text-white">
                        System Workspace Terminal
                    </h2>
                    <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded border border-zinc-800 bg-zinc-900 text-zinc-400">
                        Operator: {auth.user.name} ({auth.user.role})
                    </span>
                </div>
            }
        >
            <Head
                title={isAdminMode ? "Admin Control Panel" : "Staff Workspace"}
            />

            <div className="py-6 min-h-screen bg-slate-950/90 text-white font-sans antialiased">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {isAdminMode ? (
                        /* Render the master management pane for administrators */
                        <AdminDashboard
                            auth={auth}
                            services={services || []}
                            clients={clients || []}
                            projects={projects || []}
                            projectUpdates={projectUpdates || []}
                        />
                    ) : (
                        /* FIXED: Passing core arrays to staff component */
                        <StaffDashboard
                            auth={auth}
                            projects={projects || []}
                            projectUpdates={projectUpdates || []}
                        />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
