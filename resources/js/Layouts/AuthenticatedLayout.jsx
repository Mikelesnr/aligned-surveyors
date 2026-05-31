// import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import Footer from "@/Components/Footer";
import FloatingChatbot from "@/Components/FloatingChatbot";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div
            className="min-h-screen bg-slate-900/50 flex flex-col"
            style={{
                backgroundImage: "url('/images/backgrounds/bg2.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <nav className="border-b border-gray-100 bg-slate-850/50 bg-opacity-20 h-20 z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white">
                    <div className="flex h-16 justify-between items-center">
                        <div className="flex items-center">
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="flex items-center">
                                    {/* Changed p-2 to p-1.5 for tighter fit; added shrink-0 to container */}
                                    <div className="p-1.5 rounded-xl backdrop-blur-sm h-16 shrink-0 items-center border border-white/10">
                                        <img
                                            src="/images/logo2.png"
                                            alt="Aligned Surveyors Logo"
                                            // Kept h-12, but consider reducing if it still overlaps
                                            className="bg-slate-100 bg-opacity-90 rounded-xl h-16 md:h-16 w-auto object-contain transition-all duration-300"
                                        />
                                    </div>
                                </Link>
                            </div>

                            {/* Primary Navigation Links */}
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex header-color z-50">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    <span className="header-color2">
                                        Dashboard
                                    </span>
                                </NavLink>

                                <NavLink
                                    href={route("chat.index")}
                                    active={route().current("chat.index")}
                                >
                                    <span
                                        className={`me-2 inline-block h-2 w-2 rounded-full shrink-0 ${
                                            route().current("chat.index")
                                                ? "bg-green-500 animate-pulse"
                                                : "bg-slate-950/90"
                                        }`}
                                    />
                                    <span className="header-color2">Chat</span>
                                </NavLink>

                                {/* ADD THIS NEW LINK */}
                                <NavLink
                                    href={route("groups.index")}
                                    active={route().current("groups.*")}
                                >
                                    <span
                                        className={`me-2 inline-block h-2 w-2 rounded-full shrink-0 ${
                                            route().current("groups.index")
                                                ? "bg-green-500 animate-pulse"
                                                : "bg-slate-950/90"
                                        }`}
                                    />
                                    <span className="header-color2">
                                        Groups
                                    </span>
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-slate-850/50 px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    {/* Mobile Section */}
                    <div className="space-y-1 pb-3 pt-2 bg-white header-color z-50">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route("groups.index")}
                            active={route().current("groups.*")}
                        >
                            Groups
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route("chat.index")}
                            active={route().current("chat.index")}
                        >
                            Chat
                        </ResponsiveNavLink>
                    </div>
                    <div className="border-t border-gray-200 pb-1 pt-4 bg-white header-color z-50">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-slate-850/50 shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="bg-black bg-opacity-50">{children}</main>
            <Footer />

            {/* Global Survey Bot Widget for Public Guests */}
            <FloatingChatbot />
        </div>
    );
}
