import { useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

export default function Edit() {
    const { blog } = usePage().props;
    const { data, setData, patch, errors } = useForm({
        title: blog.title,
        description: blog.description,
        image: blog.image || "",
    });

    const submit = (e) => {
        e.preventDefault();
        patch(`/admin/blogs/${blog.id}`);
    };

    return (
        <AuthenticatedLayout
        >
            <div className="flex justify-center items-center min-h-screen bg-[#13181d]">
                <div className="max-w-2xl w-full p-6 bg-[#1e242b] rounded-lg shadow-md">
                    <h1 className="text-3xl font-semibold mb-6 text-center text-white">Edit Blog</h1>

                    <form onSubmit={submit} className="space-y-4">

                        <div>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData("title", e.target.value)}
                                placeholder="Title"
                                className="w-full p-3 border border-[#232a32] rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2"
                            />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                        </div>

                        <div>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            placeholder="Description"
                            className="w-full p-3 border border-[#232a32] rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2"
                        />
                            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                        </div>

                        <div>
                            <input
                                type="text"
                                value={data.image}
                                onChange={(e) => setData("image", e.target.value)}
                                placeholder="Image URL"
                                className="w-full p-3 border border-[#232a32] rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2"
                            />
                            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full py-3 bg-[#ff5252] text-white rounded-md hover:bg-[#ff6161] focus:outline-none focus:ring-2"
                            >
                                Update Blog
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
