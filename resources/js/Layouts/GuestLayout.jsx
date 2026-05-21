// import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import Footer from "@/Components/Footer";

export default function GuestLayout({ children }) {
    return (
        <div
            className="min-h-screen bg-black bg-opacity-50 flex flex-col"
            style={{
                backgroundImage: "url('/images/main-hero.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Header / Logo */}
            <div className="flex shrink-0 items-center">
                <Link href="/" className="flex items-center">
                    {/* Changed p-2 to p-1.5 for tighter fit; added shrink-0 to container */}
                    <div className="bg-black/50 p-1.5 rounded-xl backdrop-blur-sm border border-white/10 shrink-0">
                        <img
                            src="/images/logo.png"
                            alt="Aligned Surveyors Logo"
                            // Kept h-12, but consider reducing if it still overlaps
                            className="h-10 md:h-12 w-auto object-contain transition-all duration-300"
                        />
                    </div>
                </Link>
            </div>

            {/* Main Content */}
            <main className="flex-grow w-full">{children}</main>
            <Footer />
        </div>
    );
}
