// import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import Footer from "@/Components/Footer";
import FloatingChatbot from "@/Components/FloatingChatbot";

export default function GuestLayout({ children }) {
    return (
        <div
            className="min-h-screen bg-slate-900/50 flex flex-col"
            style={{
                backgroundImage: "url('/images/backgrounds/bg2.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Header / Logo */}
            <div className="bg-slate-100 bg-opacity-50 h-20 flex shrink-0 items-center">
                <Link href="/" className="flex items-center">
                    {/* Changed p-2 to p-1.5 for tighter fit; added shrink-0 to container */}
                    <div className="p-1.5 rounded-xl backdrop-blur-sm h-20 border border-white/10 shrink-0">
                        <img
                            src="/images/logo2.png"
                            alt="Aligned Surveyors Logo"
                            // Kept h-12, but consider reducing if it still overlaps
                            className="bg-slate-100 bg-opacity-90 rounded-xl h-16 md:h-16 w-auto object-contain transition-all duration-300"
                        />
                    </div>
                </Link>
            </div>

            {/* Main Content */}
            <main className="flex-grow w-full">{children}</main>
            <Footer />

            {/* Global Survey Bot Widget for Public Guests */}
            <FloatingChatbot />
        </div>
    );
}
