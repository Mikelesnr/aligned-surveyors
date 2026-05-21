import { Link } from "@inertiajs/react";

export default function PublicNav({ auth }) {
    return (
        <nav className="flex space-x-6 font-medium text-white">
            <Link href={route("welcome")} className="hover:underline">
                Home
            </Link>
            <Link href={route("services.index")} className="hover:underline">
                Services
            </Link>
            <Link href={route("projects.index")} className="hover:underline">
                Our Work
            </Link>
            <Link href={route("contact")} className="hover:underline">
                Contact
            </Link>
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
    );
}
