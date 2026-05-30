import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="min-h-screen flex flex-col justify-center items-center px-6 relative bg-black/40 text-white selection:bg-blue-500 selection:text-black">
                {/* Accent background illumination */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] pointer-events-none rounded-full" />

                <div className="w-full sm:max-w-md bg-gradient-to-b from-zinc-900/50 to-zinc-950/70 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl relative group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent rounded-t-2xl" />

                    {/* Return to Home Anchor */}
                    <div className="mb-6 flex justify-between items-center border-b border-white/5 pb-4">
                        <Link
                            href={route("welcome")}
                            className="text-xs font-mono text-zinc-400 hover:text-blue-400 transition-colors flex items-center"
                        >
                            <span>← Back to Home</span>
                        </Link>
                        <span className="text-xs uppercase tracking-widest font-bold text-zinc-500">
                            Secure Access
                        </span>
                    </div>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-blue-400 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <InputLabel
                                htmlFor="email"
                                value="Email Address"
                                className="text-zinc-300 font-medium mb-1.5"
                            />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full bg-black/40 border-white/10 text-white rounded-xl focus:border-blue-500 focus:ring-blue-500/20 transition-all placeholder-zinc-700"
                                placeholder="name@domain.com"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2 text-red-400 text-xs"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="password"
                                value="Password"
                                className="text-zinc-300 font-medium mb-1.5"
                            />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full bg-black/40 border-white/10 text-white rounded-xl focus:border-blue-500 focus:ring-blue-500/20 transition-all placeholder-zinc-700"
                                placeholder="••••••••"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2 text-red-400 text-xs"
                            />
                        </div>

                        <div className="block">
                            <label className="flex items-center cursor-pointer select-none">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    className="rounded border-white/10 bg-black/40 text-blue-600 focus:ring-blue-500/20 focus:ring-offset-0"
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <span className="ms-2 text-sm text-zinc-400 hover:text-zinc-300 transition-colors">
                                    Remember my session
                                </span>
                            </label>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-xs text-zinc-400 hover:text-blue-400 transition-colors underline underline-offset-4"
                                >
                                    Forgot your password?
                                </Link>
                            )}

                            <PrimaryButton
                                className="ms-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-6 rounded-xl shadow-lg shadow-blue-900/20 transition-all"
                                disabled={processing}
                            >
                                Log in
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
