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
            <div className="px-6 py-4 bg-black bg-opacity-50 shadow">
                <Link href="/" className="flex items-center">
                    <div className="bg-black/50 p-2 rounded-xl backdrop-blur-sm border border-white/10">
                        <img
                            src="/images/logo.png"
                            alt="Aligned Surveyors Logo"
                            className="h-12 w-auto md:h-16 transition-all duration-300"
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
