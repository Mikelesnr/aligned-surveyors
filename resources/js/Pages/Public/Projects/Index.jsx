import GuestLayout from "@/Layouts/GuestLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import PublicNav from "@/Components/PublicNav";

export default function ProjectsIndex({ auth, projects }) {
    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;

    return (
        <Layout user={auth?.user}>
            <Head title="Our Work" />
            <div className="bg-black bg-opacity-70 min-h-screen text-white">
                <header className="container mx-auto px-6 py-6 flex justify-between items-center border-b border-gray-700">
                    <h1 className="text-xl font-bold">Aligned Surveyors</h1>
                    <PublicNav auth={auth} />
                </header>

                <main className="container mx-auto px-6 py-12">
                    <h2 className="text-3xl font-bold mb-8">
                        Our Project Portfolio
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-gray-800 p-6 rounded-xl border border-gray-700"
                            >
                                <h3 className="text-lg font-bold">
                                    {project.project_title}
                                </h3>
                                <p className="text-green-500 text-sm mt-1">
                                    {project.status}
                                </p>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </Layout>
    );
}
