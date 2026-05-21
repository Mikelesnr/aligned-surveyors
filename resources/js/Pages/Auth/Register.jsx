import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="min-h-screen flex flex-col justify-center items-center px-6 relative bg-black/40 text-white selection:bg-green-500 selection:text-black">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/5 blur-[120px] pointer-events-none rounded-full" />

                <div className="w-full sm:max-w-md bg-gradient-to-b from-zinc-900/50 to-zinc-950/70 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl relative group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/20 to-transparent rounded-t-2xl" />

                    <div className="mb-6 flex justify-between items-center border-b border-white/5 pb-4">
                        <Link
                            href={route("welcome")}
                            className="text-xs font-mono text-zinc-400 hover:text-green-400 transition-colors flex items-center"
                        >
                            <span>← Back to Home</span>
                        </Link>
                        <span className="text-xs uppercase tracking-widest font-bold text-zinc-500">
                            Registration
                        </span>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <InputLabel
                                htmlFor="name"
                                value="Name"
                                className="text-zinc-300 font-medium mb-1"
                            />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full bg-black/40 border-white/10 text-white rounded-xl focus:border-green-500 focus:ring-green-500/20 transition-all placeholder-zinc-700"
                                placeholder="Full Name"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2 text-red-400 text-xs"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="email"
                                value="Email"
                                className="text-zinc-300 font-medium mb-1"
                            />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full bg-black/40 border-white/10 text-white rounded-xl focus:border-green-500 focus:ring-green-500/20 transition-all placeholder-zinc-700"
                                placeholder="name@domain.com"
                                autoComplete="username"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
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
                                className="text-zinc-300 font-medium mb-1"
                            />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full bg-black/40 border-white/10 text-white rounded-xl focus:border-green-500 focus:ring-green-500/20 transition-all placeholder-zinc-700"
                                placeholder="••••••••"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2 text-red-400 text-xs"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                                className="text-zinc-300 font-medium mb-1"
                            />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full bg-black/40 border-white/10 text-white rounded-xl focus:border-green-500 focus:ring-green-500/20 transition-all placeholder-zinc-700"
                                placeholder="••••••••"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                                required
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2 text-red-400 text-xs"
                            />
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <Link
                                href={route("login")}
                                className="text-xs text-zinc-400 hover:text-green-400 transition-colors underline underline-offset-4"
                            >
                                Already registered?
                            </Link>

                            <PrimaryButton
                                className="ms-4 bg-green-600 hover:bg-green-500 text-white font-semibold py-2.5 px-6 rounded-xl shadow-lg transition-all"
                                disabled={processing}
                            >
                                Register
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
