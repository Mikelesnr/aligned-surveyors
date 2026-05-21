import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

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
                    </div>

                    <div className="mb-5 text-sm text-zinc-400 leading-relaxed">
                        Forgot your password? No problem. Just let us know your
                        email address and we will email you a password reset
                        link that will allow you to choose a new one.
                    </div>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-400 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-4">
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full bg-black/40 border-white/10 text-white rounded-xl focus:border-green-500 focus:ring-green-500/20 transition-all placeholder-zinc-700"
                            placeholder="name@domain.com"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        <InputError
                            message={errors.email}
                            className="mt-2 text-red-400 text-xs"
                        />

                        <div className="flex items-center justify-end pt-4 border-t border-white/5">
                            <PrimaryButton
                                className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2.5 px-5 rounded-xl shadow-lg transition-all text-xs"
                                disabled={processing}
                            >
                                Email Password Reset Link
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
