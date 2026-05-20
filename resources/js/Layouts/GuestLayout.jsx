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
                <Link href="/">
                    <h1 className="text-3xl font-bold text-white">
                        VerdiSol Agro
                    </h1>
                </Link>
            </div>

            {/* Main Content */}
            <main className="flex-grow w-full">{children}</main>
            <Footer />
        </div>
    );
}
