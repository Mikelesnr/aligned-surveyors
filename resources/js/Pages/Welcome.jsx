import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PublicNav from "@/Components/PublicNav";
import { Head, Link } from "@inertiajs/react";
import data from "@/Pages/Data/Welcome.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useState } from "react";
import Modal from "@/Components/Modal";
import SectionHeader from "@/Components/SectionHeader";
import "swiper/css";

export default function Welcome({ auth }) {
    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;
    const [selectedServiceTitle, setSelectedServiceTitle] = useState(null);

    // Find the current active service object from the JSON dataset
    const activeService = data.services.find(
        (s) => s.title === selectedServiceTitle,
    );

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(
                    (e) =>
                        e.isIntersecting &&
                        e.target.classList.add("is-visible"),
                );
            },
            { threshold: 0.2 },
        );
        document
            .querySelectorAll(".animate-on-scroll")
            .forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    return (
        <Layout user={auth?.user}>
            <Head title="Aligned Surveyors" />
            <div className="antialiased bg-black bg-opacity-70 text-white">
                <header className="py-6 px-6">
                    <div className="container mx-auto flex justify-between items-center">
                        <Link href="/" className="flex items-center">
                            <div className="flex items-center space-x-3">
                                <span className="text-xl font-bold tracking-tight uppercase">
                                    Aligned{" "}
                                    <span className="header-color">
                                        Surveyo
                                    </span>
                                </span>
                            </div>
                        </Link>
                        <PublicNav auth={auth} />
                    </div>
                </header>

                <main>
                    <section className="py-20 px-6 text-center animate-on-scroll">
                        <h1 className="text-4xl font-bold mb-4">
                            Aligned Surveyors
                        </h1>
                        <br></br>
                        <h2 className="text-3xl font-bold mb-4">
                            {data.company.tagline}
                        </h2>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            {data.company.description}
                        </p>
                    </section>

                    {/* Services Section (Premium Glassmorphism) */}
                    <section
                        id="services"
                        className="py-24 px-6 relative overflow-hidden bg-black/20"
                    >
                        {/* Ambient subtle background glow */}
                        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] pointer-events-none rounded-full" />

                        <div className="container mx-auto max-w-6xl relative z-10">
                            {/* Section Header */}
                            <div className="text-center mb-16">
                                {/* Clean Component Import */}
                                <SectionHeader
                                    tagline="Expertise"
                                    title="Our Services"
                                />
                            </div>

                            {/* Services Grid looping cleanly over welcome.json data */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {data.services.map((service, i) => (
                                    <div
                                        key={i}
                                        className="group relative bg-zinc-900/40 backdrop-blur-md p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all duration-300 flex flex-col justify-between"
                                    >
                                        {/* Accent line animation overlay on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/0 via-blue-900/0 to-blue-900/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                                        <div className="w-0 h-[2px] bg-blue-500 absolute top-0 left-8 group-hover:w-1/3 transition-all duration-300 rounded-full" />

                                        <div>
                                            <div className="text-xs font-mono text-zinc-600 group-hover:text-blue-500/50 transition-colors duration-300 mb-2">
                                                0{i + 1}
                                            </div>
                                            <h4 className="font-bold text-xl mb-3 text-gray-100">
                                                {service.title}
                                            </h4>
                                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                                {service.description}
                                            </p>
                                        </div>

                                        <button
                                            onClick={() =>
                                                setSelectedServiceTitle(
                                                    service.title,
                                                )
                                            }
                                            className="inline-flex items-center text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer w-fit"
                                        >
                                            <span>Explore Details</span>
                                            <svg
                                                className="w-3 h-3 ml-1.5 transform group-hover:translate-x-1 transition-transform"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Premium Sourced Glassmorphism Information Pop-up Modal */}
                        <Modal
                            show={!!selectedServiceTitle}
                            onClose={() => setSelectedServiceTitle(null)}
                            maxWidth="lg"
                        >
                            {activeService && (
                                <div className="relative">
                                    {/* Upper right structural close icon button */}
                                    <button
                                        onClick={() =>
                                            setSelectedServiceTitle(null)
                                        }
                                        className="absolute -top-2 -right-2 text-zinc-400 hover:text-white p-2 transition-colors focus:outline-none"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>

                                    <div className="mb-6">
                                        <span className="text-blue-500 text-xs font-mono uppercase tracking-widest">
                                            Capabilities Suite
                                        </span>
                                        <h3 className="text-2xl font-bold text-white mt-1 border-b border-white/10 pb-3">
                                            {activeService.title}
                                        </h3>
                                    </div>

                                    {/* Extended details scope mapping from JSON array structures */}
                                    {activeService.details &&
                                        activeService.details.length > 0 && (
                                            <div className="mb-6">
                                                <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3">
                                                    Service Scope
                                                </h4>
                                                <ul className="space-y-2.5">
                                                    {activeService.details.map(
                                                        (detail, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="flex items-start text-sm text-zinc-400 leading-relaxed"
                                                            >
                                                                <span className="text-blue-500 mr-2 mt-1 text-xs">
                                                                    ◆
                                                                </span>
                                                                <span>
                                                                    {detail}
                                                                </span>
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                        )}

                                    {/* Verified real-world tracking references pills block */}
                                    {activeService.projects &&
                                        activeService.projects.length > 0 && (
                                            <div className="bg-black/40 border border-white/5 rounded-xl p-4">
                                                <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-2 flex items-center">
                                                    <svg
                                                        className="w-3.5 h-3.5 mr-1.5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                    Verified Project Record
                                                    References
                                                </h4>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {activeService.projects.map(
                                                        (proj, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="bg-zinc-800/80 border border-white/5 text-xs px-3 py-1.5 rounded-md text-zinc-300 font-medium"
                                                            >
                                                                {proj}
                                                            </span>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                </div>
                            )}
                        </Modal>
                    </section>

                    {/* Why Choose Us Section */}
                    <section
                        id="why-choose-us"
                        className="bg-gray-900 py-20 px-6"
                    >
                        <div className="container mx-auto">
                            {/* Clean Component Import */}
                            <SectionHeader
                                tagline="Our Values"
                                title="Why Choose Us"
                            />
                            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                                {/* Points Side */}
                                <div className="space-y-6">
                                    {data.why_choose_us.benefits.map(
                                        (benefit, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start space-x-4 animate-on-scroll"
                                            >
                                                <span className="flex-shrink-0 text-primary text-3xl font-bold text-white">
                                                    {index + 1}.
                                                </span>
                                                <div>
                                                    <h4 className="text-xl font-bold mb-1 text-white">
                                                        {benefit.title}
                                                    </h4>
                                                    <p className="header-color">
                                                        {benefit.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>

                                {/* Image Side */}
                                <div className="mt-8 md:mt-0 animate-on-scroll">
                                    <img
                                        src={data.why_choose_us.image}
                                        alt="Professional Surveying"
                                        className="rounded-xl card-shadow w-full h-auto object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Featured Projects (Transparent) */}
                    <section className="py-20 px-6 animate-on-scroll">
                        <div className="container mx-auto">
                            {/* Clean Component Import */}
                            <SectionHeader
                                tagline="Case Studies"
                                title="Featured Projects"
                            />
                            <div className="grid md:grid-cols-4 gap-6">
                                {data.featured_projects.map((p) => (
                                    <div
                                        key={p.id}
                                        className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700"
                                    >
                                        <img
                                            src={p.image}
                                            alt={p.title}
                                            className="w-full h-40 object-cover"
                                        />
                                        <div className="p-4">
                                            <h4 className="font-bold">
                                                {p.title}
                                            </h4>
                                            <p className="text-gray-400 text-sm mt-1">
                                                {p.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Clients Slider (Gray Background) */}
                    <section className="py-20 px-6 bg-gray-900 animate-on-scroll">
                        <div className="container mx-auto text-center">
                            {/* Clean Component Import for Clients Section */}
                            <SectionHeader
                                tagline="Trust & Partnerships"
                                title="Our Clients"
                            />

                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={30}
                                slidesPerView={2}
                                loop={true}
                                autoplay={{
                                    delay: 2000,
                                    disableOnInteraction: false,
                                }}
                                breakpoints={{
                                    640: { slidesPerView: 3 },
                                    1024: { slidesPerView: 5 },
                                }}
                                className="px-4"
                            >
                                {data.clients.map((client, i) => (
                                    <SwiperSlide
                                        key={i}
                                        className="flex justify-center"
                                    >
                                        <div className="flex flex-col items-center gap-3">
                                            {/* Logo Container */}
                                            <div className="bg-black/20 p-6 rounded-xl w-32 h-32 flex items-center justify-center border border-white/5 hover:border-blue-500 transition-colors">
                                                <img
                                                    src={client.logo}
                                                    alt={client.name}
                                                    className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all"
                                                />
                                            </div>

                                            {/* Styled Name */}
                                            <span className="text-xs font-medium text-gray-400 group-hover:text-blue-500 transition-colors text-center px-2">
                                                {client.name}
                                            </span>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </section>

                    {/* Transparent/Glassmorphism CTA Section */}
                    <section className="py-16 px-6">
                        <div className="container mx-auto max-w-4xl">
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 text-center animate-on-scroll">
                                <SectionHeader
                                    tagline="Get in Touch"
                                    title="Ready to Start Your Next Project?"
                                />
                                <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                                    Join our list of industry partners and
                                    experience precision surveying tailored to
                                    your infrastructure needs.
                                </p>
                                <div className="flex justify-center gap-4">
                                    <a
                                        href="/contact"
                                        className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-500 transition-all duration-300"
                                    >
                                        Get a Quote
                                    </a>
                                    <a
                                        href="tel:+263773970507"
                                        className="border border-white/20 text-white font-semibold py-3 px-8 rounded-full hover:bg-white/10 transition-all duration-300"
                                    >
                                        Call Us
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </Layout>
    );
}
