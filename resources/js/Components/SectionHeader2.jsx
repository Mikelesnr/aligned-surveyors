import React from "react";

export default function SectionHeader2({ tagline, title, className = "" }) {
    return (
        <div className={`text-center mb-16 ${className}`}>
            {tagline && (
                <span className="header-color text-sm font-semibold tracking-widest uppercase block mb-2">
                    {tagline}
                </span>
            )}
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {title}
            </h3>
            <div className="w-12 h-1 section-bg mx-auto mt-4 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
        </div>
    );
}
