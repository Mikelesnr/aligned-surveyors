import React from "react";
import { Link } from "@inertiajs/react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Company Info */}
                <div>
                    <h3 className="text-xl font-semibold mb-3">
                        Aligned Surveyors
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        "Impossible Is Impossible With Us."
                        <br />
                        <br />
                        An engineering Surveying Consultancy firm established in
                        2017, providing solutions in spatial and infrastructure
                        development.
                    </p>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li>
                            <a
                                href="#services"
                                className="hover:text-green-500 transition-colors"
                            >
                                Services
                            </a>
                        </li>
                        <li>
                            <a
                                href="#why-choose-us"
                                className="hover:text-green-500 transition-colors"
                            >
                                Why Choose Us
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contact"
                                className="hover:text-green-500 transition-colors"
                            >
                                Contact
                            </a>
                        </li>
                        <li>
                            <Link
                                href={route("dashboard")}
                                className="hover:text-green-500 transition-colors"
                            >
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
                    <p className="text-sm text-gray-400">
                        9 Lincoln Court, Belgravia
                    </p>
                    <p className="text-sm text-gray-400">Harare, Zimbabwe</p>
                    <div className="mt-4 space-y-1">
                        <p className="text-sm text-green-500 font-medium">
                            kknyandoro@alignedsurveyors.com
                        </p>
                        <p className="text-sm text-green-500 font-medium">
                            kknyandoro@gmail.com
                        </p>
                        <p className="text-sm text-gray-400">
                            +263 773 970 507
                        </p>
                        <p className="text-sm text-gray-400">
                            +263 716 726 596
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
                &copy; {new Date().getFullYear()} Aligned Surveyors (PVT) LTD.
                All rights reserved.
            </div>
        </footer>
    );
}
