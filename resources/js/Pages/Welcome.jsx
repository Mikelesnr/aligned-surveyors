import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth }) {
    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.2,
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll(".animate-on-scroll").forEach((section) => {
            observer.observe(section);
        });

        // Cleanup function
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Layout user={auth?.user}>
                <Head title="VerdiSol Agro - Dynamic Precision Farming" />
                <div className="antialiased bg-black bg-opacity-70">
                    {/* Header & Hero Section */}
                    <header className="relative text-white">
                        <div className="py-6">
                            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
                                <nav className="mt-4 md:mt-0 text-ce">
                                    <ul className="flex space-x-6 font-medium text-center">
                                        <li>
                                            <a
                                                href="#services"
                                                className="hover:underline"
                                            >
                                                Services
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#why-choose-us"
                                                className="hover:underline"
                                            >
                                                Why Choose Us
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#contact"
                                                className="hover:underline"
                                            >
                                                Contact
                                            </a>
                                        </li>
                                        {auth.user ? (
                                            <li>
                                                <Link
                                                    href={route("dashboard")}
                                                    className="hover:underline"
                                                >
                                                    Dashboard
                                                </Link>
                                            </li>
                                        ) : (
                                            <>
                                                <li>
                                                    <Link
                                                        href={route("login")}
                                                        className="hover:underline"
                                                    >
                                                        Log in
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={route("register")}
                                                        className="hover:underline"
                                                    >
                                                        Register
                                                    </Link>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </header>

                    <main>
                        {/* Hero Section */}
                        <section className="py-20 px-6 text-center animate-on-scroll">
                            <div className="container mx-auto">
                                <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 animate-[fadeIn_1.5s_ease-out_forwards] text-white">
                                    Farming the Future, Sustainably.
                                </h2>
                                <p className="text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto animate-[fadeIn_2s_ease-out_forwards] text-white">
                                    VerdiSol Agro is your partner in precision
                                    farming, providing data-driven solutions to
                                    optimize farm productivity, profitability,
                                    and sustainability in Zimbabwe.
                                </p>
                                <a
                                    href="#services"
                                    className="btn-primary inline-block text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-500 hover:text-primary transition-colors duration-300"
                                >
                                    Explore Our Services
                                </a>
                            </div>
                        </section>

                        {/* Services Section */}
                        <section id="services" className="py-20 px-6">
                            <div className="container mx-auto">
                                <h3 className="text-white text-3xl font-bold text-center mb-12 animate-on-scroll">
                                    Our Services
                                </h3>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {/* Service Card 1 */}
                                    <div className="bg-gray-500 rounded-xl p-8 card-shadow animate-on-scroll">
                                        <div className="mb-4">
                                            {/* SVG icon for Drone Mapping */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-12 w-12 text-primary"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.593 3-6.125-2.091 1.543-4.654 2.188-6 2.188-1.346 0-3.909-.645-6-2.188-1.543 1.532-3 6.125-3 6.125"
                                                />
                                            </svg>
                                        </div>
                                        <h4 className="text-xl font-bold mb-2">
                                            Drone Mapping & Aerial Analysis
                                        </h4>
                                        <p className="text-green-500">
                                            We use advanced drone technology to
                                            capture high-resolution images and
                                            create detailed 3D maps of your
                                            farm, providing a comprehensive
                                            overview for strategic planning.
                                        </p>
                                    </div>

                                    {/* Service Card 2 */}
                                    <div className="bg-gray-500 rounded-xl p-8 card-shadow animate-on-scroll">
                                        <div className="mb-4">
                                            {/* SVG icon for Water Surveys */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-12 w-12 text-primary"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 21a9 9 0 01-9-9m9 9a9 9 0 009-9m-9 9l-2.483-2.483m2.483 2.483L9.517 9.517m2.483 2.483l2.483-2.483m-2.483 2.483L14.483 14.483m-2.483-2.483l-2.483 2.483M12 21l-2.483-2.483m-2.483 2.483L9.517 9.517m-2.483-2.483l2.483-2.483M12 21l-2.483-2.483"
                                                />
                                            </svg>
                                        </div>
                                        <h4 className="text-xl font-bold mb-2">
                                            Underground Water Surveys
                                        </h4>
                                        <p className="text-green-500">
                                            Our surveys locate reliable
                                            underground water sources and assess
                                            borehole potential, preventing
                                            costly dry holes and ensuring
                                            sustainable water access.
                                        </p>
                                    </div>

                                    {/* Service Card 3 */}
                                    <div className="bg-gray-500 rounded-xl p-8 card-shadow animate-on-scroll">
                                        <div className="mb-4">
                                            {/* SVG icon for Soil Analysis */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-12 w-12 text-primary"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 6a4 4 0 100 8 4 4 0 000-8zM12 2a10 10 0 100 20 10 10 0 000-20z"
                                                />
                                            </svg>
                                        </div>
                                        <h4 className="text-xl font-bold mb-2">
                                            Land Capability & Soil Analysis
                                        </h4>
                                        <p className="text-green-500">
                                            We evaluate soil quality and
                                            topography to determine the optimal
                                            use of your land, helping you make
                                            informed decisions for crop
                                            selection and management.
                                        </p>
                                    </div>

                                    {/* Service Card 4 */}
                                    <div className="bg-gray-500 rounded-xl p-8 card-shadow animate-on-scroll">
                                        <div className="mb-4">
                                            {/* SVG icon for Planning */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-12 w-12 text-primary"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 14.25a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm0 0V21m0-6.75a2.25 2.25 0 10-4.5 0 2.25 2.25 0 014.5 0zM12 14.25a2.25 2.25 0 114.5 0 2.25 2.25 0 00-4.5 0zm0 0V21m0-6.75a2.25 2.25 0 114.5 0 2.25 2.25 0 00-4.5 0zm6.75-6.75a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                                                />
                                            </svg>
                                        </div>
                                        <h4 className="text-xl font-bold mb-2">
                                            Land Use & Management Planning
                                        </h4>
                                        <p className="text-green-500">
                                            Our team develops scientific
                                            land-use plans tailored to your
                                            specific needs, improving
                                            efficiency, productivity, and
                                            long-term sustainability.
                                        </p>
                                    </div>

                                    {/* Service Card 5 */}
                                    <div className="bg-gray-500 rounded-xl p-8 card-shadow animate-on-scroll">
                                        <div className="mb-4">
                                            {/* SVG icon for Project Management */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-12 w-12 text-primary"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m-3 0V3m0 2v2m0-2a2 2 0 00-2-2m2 2a2 2 0 012 2h-4a2 2 0 012-2zM9 9a2 2 0 012 2h-2m2 2h2m-2-2a2 2 0 01-2 2h-2a2 2 0 01-2-2m-2-2h-2m2 2h-2m2 2h-2m2 2h2m-2-2h6m-6 4h6m-6 4h6m-6-8h6m-6 4h6m-6 4h6m-6-8h6M9 8h6M9 4h6M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                        <h4 className="text-xl font-bold mb-2">
                                            Project Management & Implementation
                                        </h4>
                                        <p className="text-green-500">
                                            We provide expert guidance on
                                            project implementation, including
                                            labor and equipment strategy, to
                                            help you successfully achieve your
                                            farming goals.
                                        </p>
                                    </div>

                                    {/* Service Card 6 */}
                                    <div className="bg-gray-500 rounded-xl p-8 card-shadow animate-on-scroll">
                                        <div className="mb-4">
                                            {/* SVG icon for Reports */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-12 w-12 text-primary"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M9 12h6m-6 4h6m-6 4h6m-6-8h6m-6 4h6m-6 4h6m-6-8h6m-6 4h6m-6 4h6M9 8h6M9 4h6M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                        <h4 className="text-xl font-bold mb-2">
                                            Customized Farm Reports
                                        </h4>
                                        <p className="text-green-500">
                                            Receive detailed reports with
                                            actionable insights and highlighted
                                            opportunities, enabling you to make
                                            smarter, data-driven decisions.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Why Choose Us Section */}
                        <section
                            id="why-choose-us"
                            className="bg-gray-500 py-20 px-6"
                        >
                            <div className="container mx-auto">
                                <h3 className="text-3xl font-bold text-center mb-12 animate-on-scroll">
                                    Why Farmers Choose VerdiSol Agro
                                </h3>
                                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                                    <div className="space-y-6">
                                        {/* Benefit 1 */}
                                        <div className="flex items-start space-x-4 animate-on-scroll">
                                            <span className="flex-shrink-0 text-primary text-3xl font-bold">
                                                1.
                                            </span>
                                            <div>
                                                <h4 className="text-xl font-bold mb-1">
                                                    Data-Driven Decisions
                                                </h4>
                                                <p className="text-green-500">
                                                    We provide data-backed
                                                    insights through drone
                                                    technology and scientific
                                                    analysis, helping you
                                                    eliminate guesswork and farm
                                                    with confidence.
                                                </p>
                                            </div>
                                        </div>
                                        {/* Benefit 2 */}
                                        <div className="flex items-start space-x-4 animate-on-scroll">
                                            <span className="flex-shrink-0 text-primary text-3xl font-bold">
                                                2.
                                            </span>
                                            <div>
                                                <h4 className="text-xl font-bold mb-1">
                                                    Increased Productivity
                                                </h4>
                                                <p className="text-green-500">
                                                    Our solutions help you boost
                                                    productivity and achieve
                                                    higher yields through
                                                    optimized farm management
                                                    and efficient resource
                                                    allocation.
                                                </p>
                                            </div>
                                        </div>
                                        {/* Benefit 3 */}
                                        <div className="flex items-start space-x-4 animate-on-scroll">
                                            <span className="flex-shrink-0 text-primary text-3xl font-bold">
                                                3.
                                            </span>
                                            <div>
                                                <h4 className="text-xl font-bold mb-1">
                                                    Cost Reduction
                                                </h4>
                                                <p className="text-green-500">
                                                    By improving resource
                                                    allocation and efficiency,
                                                    we help you reduce input
                                                    costs and maximize your
                                                    return on investment.
                                                </p>
                                            </div>
                                        </div>
                                        {/* Benefit 4 */}
                                        <div className="flex items-start space-x-4 animate-on-scroll">
                                            <span className="flex-shrink-0 text-primary text-3xl font-bold">
                                                4.
                                            </span>
                                            <div>
                                                <h4 className="text-xl font-bold mb-1">
                                                    Sustainable Practices
                                                </h4>
                                                <p className="text-green-500">
                                                    Our focus is on fostering
                                                    long-term profitability and
                                                    environmental stewardship
                                                    through sustainable farming
                                                    methods.
                                                </p>
                                            </div>
                                        </div>
                                        {/* Benefit 5 */}
                                        <div className="flex items-start space-x-4 animate-on-scroll">
                                            <span className="flex-shrink-0 text-primary text-3xl font-bold">
                                                5.
                                            </span>
                                            <div>
                                                <h4 className="text-xl font-bold mb-1">
                                                    Expert Guidance
                                                </h4>
                                                <p className="text-green-500">
                                                    We offer professional
                                                    consulting and a clear
                                                    roadmap, transforming
                                                    uncertainty into actionable
                                                    plans for your farm's
                                                    success.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8 md:mt-0 animate-on-scroll">
                                        <img
                                            src="images/precision-farming.jpg"
                                            alt="Precision farming landscape"
                                            className="rounded-xl card-shadow w-full h-auto object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Contact Section */}
                        <section
                            id="contact"
                            className="py-20 px-6 text-center animate-on-scroll"
                        >
                            <div className="container mx-auto max-w-2xl">
                                <h3 className="text-3xl font-bold mb-4 text-white">
                                    Ready to Transform Your Farm?
                                </h3>
                                <p className="text-lg text-green-500 mb-8">
                                    Contact us today to learn how VerdiSol Agro
                                    can help you achieve higher productivity,
                                    increased profitability, and a more
                                    sustainable future.
                                </p>
                                <a
                                    href="mailto:info@verdisolagro.co.zw"
                                    className="btn-primary inline-block text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-500 hover:text-primary transition-colors duration-300"
                                >
                                    Get in Touch
                                </a>
                            </div>
                        </section>
                    </main>
                </div>
            </Layout>
        </>
    );
}
