import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="min-h-screen flex flex-col justify-center items-center px-6 relative bg-black/40 text-white selection:bg-green-500 selection:text-black">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/5 blur-[120px] pointer-events-none rounded-full" />

                <div className="w-full sm:max-w-md bg-gradient-to-b from-zinc-900/50 to-zinc-950/70 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl relative group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/20 to-transparent rounded-t-2xl" />

                    <div className="mb-4 flex justify-between items-center border-b border-white/5 pb-4">
                        <Link
                            href={route("welcome")}
                            className="text-xs font-mono text-zinc-400 hover:text-green-400 transition-colors flex items-center"
                        >
                            <span>← Back to Home</span>
                        </Link>
                        <span className="text-xs uppercase tracking-widest font-bold text-zinc-500">
                            Verification
                        </span>
                    </div>

                    <div className="mb-5 text-sm text-zinc-400 leading-relaxed">
                        Thanks for signing up! Before getting started, could you
                        verify your email address by clicking on the link we
                        just emailed to you? If you didn't receive the email, we
                        will gladly send you another.
                    </div>

                    {status === "verification-link-sent" && (
                        <div className="mb-5 text-sm font-medium text-green-400 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                            A new verification link has been sent to the email
                            address you provided during registration.
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div className="mt-4 flex items-center justify-between pt-4 border-t border-white/5">
                            <PrimaryButton
                                className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2.5 px-5 rounded-xl shadow-lg transition-all text-xs"
                                disabled={processing}
                            >
                                Resend Verification Email
                            </PrimaryButton>

                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="text-xs text-zinc-400 hover:text-red-400 transition-colors underline underline-offset-4"
                            >
                                Log Out
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
