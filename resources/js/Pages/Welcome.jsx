import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PublicNav from "@/Components/PublicNav";
import { Head, Link } from "@inertiajs/react";
import data from "@/Pages/Data/welcome.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function Welcome({ auth }) {
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
                            <div className="bg-black/50 p-2 rounded-xl backdrop-blur-sm border border-white/10">
                                <h1 className="text-xl font-bold">
                                    Aligned Surveyors
                                </h1>
                            </div>
                        </Link>
                        <PublicNav auth={auth} />
                    </div>
                </header>

                <main>
                    <section className="py-20 px-6 text-center animate-on-scroll">
                        <h2 className="text-4xl font-bold mb-4">
                            {data.company.tagline}
                        </h2>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            {data.company.description}
                        </p>
                    </section>

                    {/* Services Section (Transparent) */}
                    <section className="py-20 px-6 animate-on-scroll">
                        <div className="container mx-auto">
                            <h3 className="text-3xl font-bold mb-10 text-center">
                                Our Services
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {data.services.map((s, i) => (
                                    <div
                                        key={i}
                                        className="bg-gray-800 p-6 rounded-xl border border-gray-700"
                                    >
                                        <h4 className="font-bold text-lg mb-2">
                                            {s.title}
                                        </h4>
                                        <p className="text-gray-400 text-sm">
                                            {s.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Why Choose Us Section */}
                    <section
                        id="why-choose-us"
                        className="bg-gray-900 py-20 px-6"
                    >
                        <div className="container mx-auto">
                            <h3 className="text-3xl font-bold text-center mb-12 animate-on-scroll text-white">
                                {data.why_choose_us.title}
                            </h3>
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
                                                    <p className="text-green-300">
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
                            <h3 className="text-3xl font-bold mb-10 text-center">
                                Featured Projects
                            </h3>
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
                            <h3 className="text-3xl font-bold mb-10 text-white">
                                Our Clients
                            </h3>

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
                                            <div className="bg-black/20 p-6 rounded-xl w-32 h-32 flex items-center justify-center border border-white/5 hover:border-green-500 transition-colors">
                                                <img
                                                    src={client.logo}
                                                    alt={client.name}
                                                    className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all"
                                                />
                                            </div>

                                            {/* Styled Name */}
                                            <span className="text-xs font-medium text-gray-400 group-hover:text-green-500 transition-colors text-center px-2">
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
                                <h3 className="text-3xl font-bold text-white mb-4">
                                    Ready to Start Your Next Project?
                                </h3>
                                <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                                    Join our list of industry partners and
                                    experience precision surveying tailored to
                                    your infrastructure needs.
                                </p>
                                <div className="flex justify-center gap-4">
                                    <a
                                        href="/contact"
                                        className="bg-green-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-green-500 transition-all duration-300"
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
