import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { useRef } from "react";

export default function UpdatePasswordForm({ className = "" }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <h3 className="text-lg font-semibold text-white">
                    Update Security Key
                </h3>
                <p className="mt-1 text-sm text-zinc-400">
                    Ensure your system account is utilizing an advanced string
                    hash sequence to maintain system security.
                </p>
            </header>

            <form onSubmit={updatePassword} className="space-y-5">
                <div>
                    <InputLabel
                        htmlFor="current_password"
                        value="Current Security Password"
                        className="text-zinc-300 font-medium mb-1.5"
                    />
                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData("current_password", e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full bg-black/40 border-white/10 text-white rounded-xl focus:border-green-500 focus:ring-green-500/20 transition-all placeholder-zinc-700"
                        autoComplete="current-password"
                        placeholder="••••••••"
                    />
                    <InputError
                        message={errors.current_password}
                        className="mt-2 text-red-400 text-xs"
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password"
                        value="New Account Password"
                        className="text-zinc-300 font-medium mb-1.5"
                    />
                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        type="password"
                        className="mt-1 block w-full bg-black/40 border-white/10 text-white rounded-xl focus:border-green-500 focus:ring-green-500/20 transition-all placeholder-zinc-700"
                        autoComplete="new-password"
                        placeholder="••••••••"
                    />
                    <InputError
                        message={errors.password}
                        className="mt-2 text-red-400 text-xs"
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm New Sequence"
                        className="text-zinc-300 font-medium mb-1.5"
                    />
                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full bg-black/40 border-white/10 text-white rounded-xl focus:border-green-500 focus:ring-green-500/20 transition-all placeholder-zinc-700"
                        autoComplete="new-password"
                        placeholder="••••••••"
                    />
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2 text-red-400 text-xs"
                    />
                </div>

                <div className="flex items-center gap-4 pt-2 border-t border-white/5">
                    <PrimaryButton
                        className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-5 rounded-xl shadow-md transition-all"
                        disabled={processing}
                    >
                        Commit New Password
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0 translate-x-2"
                        leave="transition ease-in-out duration-300"
                        leaveTo="opacity-0"
                    >
                        <p className="text-xs font-mono text-green-400 flex items-center space-x-1">
                            <span>✓</span>{" "}
                            <span>Sequence shifted successfully.</span>
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
