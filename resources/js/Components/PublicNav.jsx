import { useState } from "react";
import { Link } from "@inertiajs/react";

export default function PublicNav({ auth }) {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: route("welcome") },
        { name: "Services", href: route("services.index") },
        { name: "Our Work", href: route("projects.index") },
        { name: "Contact", href: route("contact") },
    ];

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                className="md:hidden p-2 text-white"
                onClick={() => setIsOpen(!isOpen)}
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    {isOpen ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    )}
                </svg>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 font-medium text-white">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="hover:underline hover:text-green-500 transition-colors"
                    >
                        {link.name}
                    </Link>
                ))}
                {auth?.user ? (
                    <Link href={route("dashboard")} className="hover:underline">
                        Dashboard
                    </Link>
                ) : (
                    <Link href={route("login")} className="hover:underline">
                        Log in
                    </Link>
                )}
            </nav>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-20 left-0 w-full bg-black/95 p-6 flex flex-col space-y-4 md:hidden z-50 border-b border-gray-700">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-white hover:text-green-500"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    {auth?.user ? (
                        <Link href={route("dashboard")} className="text-white">
                            Dashboard
                        </Link>
                    ) : (
                        <Link href={route("login")} className="text-white">
                            Log in
                        </Link>
                    )}
                </div>
            )}
        </>
    );
}
