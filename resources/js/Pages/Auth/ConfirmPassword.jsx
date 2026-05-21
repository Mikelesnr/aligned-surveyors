import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.confirm"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

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
                            Security Check
                        </span>
                    </div>

                    <div className="mb-5 text-sm text-zinc-400 leading-relaxed">
                        This is a secure area of the application. Please confirm
                        your password before continuing.
                    </div>

                    <form onSubmit={submit} className="space-y-4">
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
                                isFocused={true}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2 text-red-400 text-xs"
                            />
                        </div>

                        <div className="flex items-center justify-end pt-4 border-t border-white/5">
                            <PrimaryButton
                                className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2.5 px-6 rounded-xl shadow-lg transition-all"
                                disabled={processing}
                            >
                                Confirm
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
