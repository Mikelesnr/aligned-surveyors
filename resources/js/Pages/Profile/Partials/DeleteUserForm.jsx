import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useRef, useState } from "react";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h3 className="text-lg font-semibold text-red-400">
                    Decommission Account Zone
                </h3>
                <p className="mt-1 text-sm text-zinc-400">
                    Permanently drop and wipe all spatial layers, assets,
                    profile indexes, and historical access profiles linked to
                    this workspace.
                </p>
            </header>

            <div className="pt-2">
                <DangerButton
                    onClick={confirmUserDeletion}
                    className="bg-red-600/10 border border-red-500/30 text-red-400 hover:bg-red-600 hover:text-white px-5 py-2.5 rounded-xl font-medium transition-all text-sm shadow-md"
                >
                    Decommission Account
                </DangerButton>
            </div>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form
                    onSubmit={deleteUser}
                    className="p-8 bg-zinc-950 text-white border border-white/10 rounded-2xl relative"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/40 to-transparent rounded-t-2xl" />

                    <h3 className="text-xl font-bold text-white mb-2">
                        Are you absolutely certain?
                    </h3>

                    <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                        Once this transaction initializes, all cached databases
                        will perform an unrecoverable sweep. Please confirm your
                        main validation key sequence below to authorize
                        deletion.
                    </p>

                    <div>
                        <InputLabel
                            htmlFor="password"
                            value="Authorization Password"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="block w-full bg-black/50 border-white/10 text-white rounded-xl focus:border-red-500 focus:ring-red-500/20 transition-all placeholder-zinc-700"
                            isFocused
                            placeholder="Enter password to confirm access drop"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2 text-red-400 text-xs"
                        />
                    </div>

                    <div className="mt-8 flex justify-end space-x-3 pt-4 border-t border-white/5">
                        <SecondaryButton
                            onClick={closeModal}
                            className="bg-zinc-900 border border-white/10 text-zinc-300 hover:bg-zinc-800 px-5 py-2.5 rounded-xl font-medium transition-colors text-sm"
                        >
                            Cancel Transaction
                        </SecondaryButton>

                        <DangerButton
                            className="bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors text-sm shadow-lg shadow-red-900/10"
                            disabled={processing}
                        >
                            Confirm Pure Purge
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
