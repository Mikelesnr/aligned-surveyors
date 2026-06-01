import { useEffect } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PublicNav from "@/Components/PublicNav";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import SectionHeader2 from "@/Components/SectionHeader2";

export default function Contact({ auth, status }) {
    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;

    const { data, setData, post, processing, reset } = useForm({
        name: "",
        email: "",
        message: "",
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(
                    (e) =>
                        e.isIntersecting &&
                        e.target.classList.add("is-visible"),
                );
            },
            { threshold: 0.1 },
        );
        document
            .querySelectorAll(".animate-on-scroll")
            .forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("contact.submit"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <Layout user={auth?.user}>
            <Head title="Contact Us" />

            {/* Main overlay wrapper matches your precise welcome/about backdrop opacity */}
            <div className="antialiased bg-black bg-opacity-70 text-white">
                {/* Header Navigation Section */}
                <header className="container mx-auto px-6 py-6 flex justify-between items-center relative z-50">
                    <Link href="/" className="flex items-center">
                        <div className="flex items-center space-x-3">
                            <span className="text-xl font-bold tracking-tight uppercase">
                                Aligned{" "}
                                <span className="header-color">Surveyors</span>
                            </span>
                        </div>
                    </Link>
                    <PublicNav auth={auth} />
                </header>

                <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10">
                    <div className="grid md:grid-cols-12 gap-12 items-start mt-8">
                        {/* Left Column: Contextual Action Text */}
                        <div className="md:col-span-5 space-y-6 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
                            <SectionHeader2
                                tagline="Get In Touch"
                                title="Let's Build Together"
                            />
                            <p className="text-slate-300 leading-relaxed text-sm md:text-base bg-slate-900/60 p-4 rounded-lg">
                                Have an upcoming project or need precision
                                spatial advice? Fill out the form, and our
                                engineering team will get back to you with an
                                optimized solutions model.
                            </p>

                            {/* Fast Contact Channels */}
                            <div className="pt-6 space-y-4 border-t border-white/5 text-sm font-mono bg-slate-900/60 p-4 rounded-lg">
                                <div className="flex items-center space-x-3 group">
                                    <span className="text-blue-500">⚡</span>
                                    <a
                                        href="tel:+263773970507"
                                        className="header-color group-hover:text-white transition-colors"
                                    >
                                        +263 773 970 507
                                    </a>
                                </div>
                                <div className="flex items-center space-x-3 group">
                                    <span className="text-blue-500">✉️</span>
                                    <a
                                        href="mailto:kknyandoro@gmail.com"
                                        className="header-color group-hover:text-white transition-colors break-all"
                                    >
                                        kknyandoro@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Premium Form Card */}
                        <div
                            id="form-container"
                            className="md:col-span-7 bg-gradient-to-b from-slate-900/60 to-slate-950/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl relative group animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-150"
                        >
                            {/* Decorative Top Accent Glow Strip */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />

                            {status && (
                                <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl text-sm font-medium">
                                    {status}
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <InputLabel
                                        htmlFor="name"
                                        value="Full Name"
                                        className="text-slate-300 font-medium mb-1.5 block"
                                    />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        className="w-full bg-black/40 border-white/10 text-white rounded-xl focus:border-blue-500 focus:ring-blue-500/20 transition-all placeholder-gray-600"
                                        placeholder="John Doe"
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                {/* Email Field */}
                                <div>
                                    <InputLabel
                                        htmlFor="email"
                                        value="Email Address"
                                        className="text-slate-300 font-medium mb-1.5 block"
                                    />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        className="w-full bg-black/40 border-white/10 text-white rounded-xl focus:border-blue-500 focus:ring-blue-500/20 transition-all placeholder-gray-600"
                                        placeholder="johndoe@example.com"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                {/* Message Field */}
                                <div>
                                    <InputLabel
                                        htmlFor="message"
                                        value="Project Requirements"
                                        className="text-slate-300 font-medium mb-1.5 block"
                                    />
                                    <textarea
                                        id="message"
                                        value={data.message}
                                        className="w-full bg-black/40 border border-white/10 text-white rounded-xl focus:border-blue-500 focus:ring-blue-500/20 transition-all placeholder-gray-600 p-3 text-sm"
                                        rows="5"
                                        placeholder="Tell us about your survey or spatial development parameters..."
                                        onChange={(e) =>
                                            setData("message", e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                {/* Action Submit Button */}
                                <div className="pt-2">
                                    <PrimaryButton
                                        className="w-full justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <span className="flex items-center space-x-2">
                                                <svg
                                                    className="animate-spin h-4 w-4 text-white"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    />
                                                </svg>
                                                <span>
                                                    Processing Request...
                                                </span>
                                            </span>
                                        ) : (
                                            "Send Secure Message"
                                        )}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </Layout>
    );
}
