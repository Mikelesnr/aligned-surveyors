import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function MainNavbar() {
    const { auth } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: route("welcome") },
        { name: "Services", href: route("services.index") },
        { name: "Our Work", href: route("projects.index") },
        { name: "Contact", href: route("contact") },
    ];

    return (
        <nav className="w-full bg-black/50 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
                <div className="p-1.5 rounded-xl border border-white/10">
                    <img
                        src="/images/logo.png"
                        alt="Logo"
                        className="h-10 w-auto"
                    />
                </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6 text-white font-medium">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="hover:text-green-500 transition"
                    >
                        {link.name}
                    </Link>
                ))}

                {auth.user ? (
                    <div className="flex items-center space-x-4">
                        <Link
                            href={route("dashboard")}
                            className="hover:text-green-500"
                        >
                            Dashboard
                        </Link>
                        <div className="border-l border-white/20 pl-4">
                            <Link
                                href={route("profile.edit")}
                                className="text-sm font-semibold"
                            >
                                {auth.user.name}
                            </Link>
                        </div>
                    </div>
                ) : (
                    <Link
                        href={route("login")}
                        className="bg-green-600 px-4 py-2 rounded-full hover:bg-green-500 transition"
                    >
                        Staff Portal
                    </Link>
                )}
            </div>

            {/* Mobile Toggle... (Same as before) */}
        </nav>
    );
}
