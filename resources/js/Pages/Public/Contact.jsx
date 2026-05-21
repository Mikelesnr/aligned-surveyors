import { Head, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PublicNav from "@/Components/PublicNav";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";

export default function Contact({ auth, status }) {
    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;

    const { data, setData, post, processing, reset } = useForm({
        name: "",
        email: "",
        message: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("contact.submit"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <Layout user={auth?.user}>
            <Head title="Contact Us" />
            <div className="bg-black bg-opacity-70 min-h-screen text-white">
                <header className="container mx-auto px-6 py-6 flex justify-between items-center border-b border-gray-700">
                    <h1 className="text-xl font-bold">Aligned Surveyors</h1>
                    <PublicNav auth={auth} />
                </header>

                <main className="container mx-auto px-6 py-12 max-w-lg">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        Contact Us
                    </h2>

                    {status && (
                        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-md text-center border border-green-200">
                            {status}
                        </div>
                    )}

                    <form
                        onSubmit={submit}
                        className="bg-white p-8 rounded-lg shadow-md text-black"
                    >
                        {/* Name Field */}
                        <div className="mb-4">
                            <InputLabel htmlFor="name" value="Name" />
                            <TextInput
                                id="name"
                                value={data.name}
                                className="w-full mt-1"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                        </div>

                        {/* Email Field */}
                        <div className="mb-4">
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                value={data.email}
                                className="w-full mt-1"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />
                        </div>

                        {/* Message Field */}
                        <div className="mb-6">
                            <InputLabel htmlFor="message" value="Message" />
                            <textarea
                                id="message"
                                value={data.message}
                                className="w-full border-gray-300 rounded-md mt-1 focus:ring-indigo-500 focus:border-indigo-500"
                                rows="4"
                                onChange={(e) =>
                                    setData("message", e.target.value)
                                }
                                required
                            />
                        </div>

                        <PrimaryButton
                            className="w-full justify-center"
                            disabled={processing}
                        >
                            {processing ? "Sending..." : "Send Message"}
                        </PrimaryButton>
                    </form>
                </main>
            </div>
        </Layout>
    );
}
