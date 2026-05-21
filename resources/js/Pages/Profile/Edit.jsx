import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout>
            <Head title="Profile Settings" />

            <div className="min-h-screen text-white bg-black/40 selection:bg-green-500 selection:text-black relative pb-12">
                {/* Decorative radial lighting blend layout */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/5 blur-[150px] pointer-events-none rounded-full" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-500/[0.02] blur-[120px] pointer-events-none rounded-full" />

                <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 relative z-10">
                    {/* Header Zone */}
                    <div className="mb-10 px-4 sm:px-0">
                        <span className="text-xs uppercase font-mono tracking-widest text-green-500 block mb-2">
                            Management Panel
                        </span>
                        <h2 className="text-3xl font-bold tracking-tight text-white">
                            Account Settings
                        </h2>
                    </div>

                    <div className="space-y-8">
                        {/* Profile Info Card */}
                        <div className="bg-gradient-to-b from-zinc-900/40 to-zinc-950/60 backdrop-blur-md border border-white/10 p-6 sm:p-8 rounded-2xl shadow-xl relative group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>

                        {/* Security Card */}
                        <div className="bg-gradient-to-b from-zinc-900/40 to-zinc-950/60 backdrop-blur-md border border-white/10 p-6 sm:p-8 rounded-2xl shadow-xl relative group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>

                        {/* Zone of Danger Card */}
                        <div className="bg-gradient-to-b from-zinc-900/40 to-zinc-950/60 backdrop-blur-md border border-red-500/10 p-6 sm:p-8 rounded-2xl shadow-xl relative group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
