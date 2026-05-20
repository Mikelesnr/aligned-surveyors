import React from "react";
import { Link } from "@inertiajs/react";

export default function Footer() {
    return (
        <footer className="bg-green-700 text-white py-8">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Company Info */}
                <div>
                    <h3 className="text-xl font-semibold mb-2">
                        VerdiSol Agro
                    </h3>
                    <p className="text-sm">
                        Precision farming solutions for sustainable agriculture
                        in Zimbabwe.
                    </p>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="#services" className="hover:underline">
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
                            <a href="#contact" className="hover:underline">
                                Contact
                            </a>
                        </li>
                        <li>
                            <Link
                                href={route("dashboard")}
                                className="hover:underline"
                            >
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
                    <p className="text-sm">info@verdisolagro.co.zw</p>
                    <p className="text-sm">+263 77 123 4567</p>
                    <p className="text-sm">Harare, Zimbabwe</p>
                </div>
            </div>

            <div className="mt-8 text-center text-xs text-white/80">
                &copy; {new Date().getFullYear()} VerdiSol Agro. All rights
                reserved.
            </div>
        </footer>
    );
}
