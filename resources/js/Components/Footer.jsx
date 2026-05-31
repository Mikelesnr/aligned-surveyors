import React from "react";
import { Link } from "@inertiajs/react";

export default function Footer() {
    return (
        <footer className="bg-white header-color2 py-12 border-t border-gray-800">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Company Info */}
                <div>
                    <h3 className="text-xl font-semibold mb-3">
                        Aligned Surveyors
                    </h3>
                    <p className="text-sm header-color leading-relaxed">
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
                    <ul className="space-y-2 text-sm header-color">
                        <li>
                            <a
                                href="#why-choose-us"
                                className="hover:text-blue-500 transition-colors"
                            >
                                Why Choose Us
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contact"
                                className="hover:text-blue-100 transition-colors"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
                    <p className="text-sm header-color">
                        9 Lincoln Court, Belgravia
                    </p>
                    <p className="text-sm header-color">Harare, Zimbabwe</p>
                    <div className="mt-4 space-y-1">
                        <p className="text-sm header-color2 font-medium">
                            kknyandoro@alignedsurveyors.com
                        </p>
                        <p className="text-sm header-color2 font-medium">
                            kknyandoro@gmail.com
                        </p>
                        <p className="text-sm header-color">+263 773 970 507</p>
                        <p className="text-sm header-color">+263 716 726 596</p>
                    </div>
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs header-color">
                &copy; {new Date().getFullYear()} Aligned Surveyors (PVT) LTD.
                All rights reserved.
            </div>
        </footer>
    );
}
