import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <h3 className="text-lg font-semibold text-white">
                    Profile Information
                </h3>
                <p className="mt-1 text-sm text-zinc-400">
                    Update your account's credentials, full name and primary
                    email address parameters.
                </p>
            </header>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel
                        htmlFor="name"
                        value="Name"
                        className="text-zinc-300 font-medium mb-1.5"
                    />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full bg-black/40 border-white/10 text-white rounded-xl focus:border-green-500 focus:ring-green-500/20 transition-all placeholder-zinc-700"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError
                        message={errors.name}
                        className="mt-2 text-red-400 text-xs"
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="email"
                        value="Email Address"
                        className="text-zinc-300 font-medium mb-1.5"
                    />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full bg-black/40 border-white/10 text-white rounded-xl focus:border-green-500 focus:ring-green-500/20 transition-all placeholder-zinc-700"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError
                        message={errors.email}
                        className="mt-2 text-red-400 text-xs"
                    />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl mt-4">
                        <p className="text-sm text-amber-400">
                            Your email address remains unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="ms-2 underline text-amber-300 hover:text-amber-200 transition-colors text-xs font-mono font-medium block mt-1"
                            >
                                Click here to dispatch a secure confirmation
                                email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-3 text-xs font-semibold text-green-400">
                                A clean validation token link has been generated
                                and sent to your email box.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 pt-2 border-t border-white/5">
                    <PrimaryButton
                        className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-5 rounded-xl shadow-md transition-all"
                        disabled={processing}
                    >
                        Save Profile Changes
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0 translate-x-2"
                        leave="transition ease-in-out duration-300"
                        leaveTo="opacity-0"
                    >
                        <p className="text-xs font-mono text-green-400 flex items-center space-x-1">
                            <span>✓</span> <span>System updated safely.</span>
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
