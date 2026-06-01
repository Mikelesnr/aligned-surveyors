import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PublicNav from "@/Components/PublicNav";
import { Head, Link } from "@inertiajs/react";
import SectionHeader from "@/Components/SectionHeader";
import SectionHeader2 from "@/Components/SectionHeader2";
import aboutData from "@/Pages/Data/About.json"; // Imported team data clean from JSON

export default function About({ auth, projects }) {
    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(
                    (e) =>
                        e.isIntersecting &&
                        e.target.classList.add("is-visible"),
                );
            },
            { threshold: 0.1 },
        );
        document
            .querySelectorAll(".animate-on-scroll")
            .forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    return (
        <Layout user={auth?.user}>
            <Head title="About Us" />

            {/* The primary wrapping layer matches Welcome's exact overlay backing opacity */}
            <div className="antialiased bg-black bg-opacity-70 text-white">
                {/* Header Navigation Section */}
                <header className="container mx-auto px-6 py-6 flex justify-between items-center relative z-50">
                    <Link href="/" className="flex items-center">
                        <div className="flex items-center space-x-3">
                            <span className="text-xl font-bold tracking-tight uppercase">
                                Aligned{" "}
                                <span className="header-color">Surveyors</span>
                            </span>
                        </div>
                    </Link>
                    <PublicNav auth={auth} />
                </header>

                <main>
                    {/* 1. Transparent Hero Section with pure solid text matching Welcome */}
                    <section className="relative pt-24 pb-20 px-6 overflow-hidden">
                        <div className="container mx-auto max-w-4xl text-center relative z-10 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
                            <span className="header-color text-sm font-bold tracking-widest uppercase block mb-3">
                                Corporate Profile
                            </span>
                            {/* Colorful text gradient completely removed to match your pure clean typography style */}
                            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
                                Impossible Is Impossible With Us
                            </h2>
                            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                                {aboutData.company.description}
                            </p>
                        </div>
                    </section>

                    {/* 2. Solid "Our People" Section using standard structural background backing matching Welcome */}
                    <section
                        className="py-24 px-6 bg-white border-t border-b border-white/5 relative z-10"
                        id="team"
                    >
                        <div className="container mx-auto max-w-5xl bg-slate-100/80 backdrop-blur-md border border-white/10 rounded-3xl p-12 relative z-10">
                            <SectionHeader
                                tagline="Leadership & Expertise"
                                title="Our People"
                            />

                            <div className="grid md:grid-cols-2 gap-8 mt-12">
                                {aboutData.team.map((member, index) => (
                                    <div
                                        key={index}
                                        className="bg-slate-950/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:border-blue-500/60 hover:-translate-y-6 hover:scale-[1.05] hover:shadow-2xl hover:shadow-blue-500/20 relative group shadow-xl flex flex-col md:flex-row gap-6 items-start animate-on-scroll opacity-0 translate-y-4"
                                        style={{
                                            transitionDelay: `${index * 150}ms`,
                                        }}
                                    >
                                        {/* Dynamic Placeholder Image Layout */}
                                        <div className="w-24 h-24 rounded-xl bg-zinc-800 border border-white/10 overflow-hidden shrink-0 shadow-inner flex items-center justify-center">
                                            {member.image ? (
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        // Fallback icon array if asset file doesn't load
                                                        e.target.style.display =
                                                            "none";
                                                        e.target.nextSibling.style.display =
                                                            "block";
                                                    }}
                                                />
                                            ) : null}
                                            <svg
                                                className="w-10 h-10 header-color2 hidden"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                />
                                            </svg>
                                        </div>

                                        <div className="flex-1 bg-slate-900/80 border border-white/10 rounded-lg p-4">
                                            <span className="text-xs text-slate-100 font-mono tracking-wider uppercase block mb-1">
                                                {member.credentials}
                                            </span>
                                            <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                                                {member.name}
                                            </h3>
                                            <p className="text-sm font-medium text-slate-100 mb-4 mt-0.5">
                                                {member.role}
                                            </p>
                                            <p className="hidden md:block text-slate-300 leading-relaxed text-sm">
                                                {member.bio}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* 3. Transparent "Our Projects" Card Grid Section matching Services structure */}
                    <section
                        id="projects"
                        className="py-24 px-6 relative overflow-hidden bg-transparent"
                    >
                        <div className="container mx-auto max-w-6xl relative z-10">
                            <SectionHeader2
                                tagline="Operations Track Record"
                                title="Our Projects"
                            />

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                                {projects
                                    ?.filter((project) => project.is_visible) // Only show visible projects
                                    .map((project, index) => (
                                        <div
                                            key={project.id}
                                            className="bg-gradient-to-b from-zinc-900/40 to-zinc-950/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:border-blue-500/80 hover:-translate-y-10 hover:scale-[1.2] hover:shadow-2xl hover:shadow-blue-500/40 group relative animate-on-scroll opacity-0 translate-y-4"
                                            style={{
                                                transitionDelay: `${index * 100}ms`,
                                            }}
                                        >
                                            <div>
                                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-500 group-hover:text-black transition-all duration-300">
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2.5}
                                                            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                                                        />
                                                    </svg>
                                                </div>

                                                <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors">
                                                    {project.project_title}
                                                </h3>

                                                <p className="text-gray-400 text-sm leading-relaxed mb-6 transition-colors duration-300 group-hover:text-white">
                                                    {project.project_description ||
                                                        "High-precision engineering and spatial survey operations delivered to compliance specification."}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wider">
                                                    {project.status ||
                                                        "Completed"}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </Layout>
    );
}
