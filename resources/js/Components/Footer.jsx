import React from "react";
import { Link } from "@inertiajs/react";

export default function Footer() {
    return (
        <footer className="bg-white header-color2 py-12 border-t border-gray-800 text-center md:text-left">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Company Info */}
                <div>
                    <h3 className="text-xl font-semibold mb-3">
                        Aligned Surveyors
                    </h3>
                    <p className="text-sm header-color leading-relaxed">
                        "Impossible Is Impossible With Us."[cite: 1, 2]
                        <br />
                        <br />
                        An engineering Surveying Consultancy firm established in
                        2017, providing solutions in spatial and infrastructure
                        development.[cite: 1, 2]
                    </p>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm header-color">
                        <li>
                            <Link
                                href="/#why-choose-us"
                                className="hover:text-blue-500 transition-colors"
                            >
                                Why Choose Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/#services"
                                className="hover:text-blue-500 transition-colors"
                            >
                                Our Services
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about/#team"
                                className="hover:text-blue-500 transition-colors"
                            >
                                Our People
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about/#projects"
                                className="hover:text-blue-500 transition-colors"
                            >
                                Our Work
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact/#form-container"
                                className="hover:text-blue-100 transition-colors"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact & Socials */}
                <div>
                    <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
                    <p className="text-sm header-color">
                        9 Lincoln Court, Belgravia[cite: 1, 2]
                    </p>
                    <p className="text-sm header-color">Harare, Zimbabwe[cite: 1, 2]</p>
                    <div className="mt-4 space-y-1">
                        <p className="text-sm header-color2 font-medium">
                            kknyandoro@gmail.com[cite: 1, 2]
                        </p>
                        <p className="text-sm header-color">+263 773 970 507[cite: 1, 2]</p>
                    </div>

                    {/* Social Media Icons */}
                    <div className="mt-6">
                        <h4 className="text-sm font-semibold mb-3 header-color2">Connect With Us</h4>
                        <div className="flex justify-center md:justify-start space-x-4">
                            {/* WhatsApp Icon */}
                            <a 
                                href="https://wa.me/263773970507?text=Hi%20Aligned%20Surveyors,%20I%20would%20like%20to%20inquire%20about%20your%20surveying%20services."
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-green-600 transition-colors"
                                aria-label="WhatsApp"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                </svg>
                            </a>

                            {/* LinkedIn Icon */}
                            <a 
                                href="https://linkedin.com/company/aligned-surveyors" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-blue-600 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                    <rect x="2" y="9" width="4" height="12"></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs header-color">
                &copy; {new Date().getFullYear()} Aligned Surveyors (PVT) LTD.[cite: 1, 2]
                All rights reserved.
            </div>
        </footer>
    );
}