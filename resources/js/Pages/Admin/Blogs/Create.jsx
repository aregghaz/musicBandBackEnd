import {Link, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

export default function Create() {
    const { data, setData, post, errors } = useForm({
        title: "",
        description: "",
        image: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/admin/blogs");
    };

    return (
    <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Create Blog
            </h2>
        }
    >
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="max-w-2xl w-full p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-semibold mb-6 text-center">Create Blog</h1>

                <form onSubmit={submit}>
                    <div className="space-y-4">
                        <div>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData("title", e.target.value)}
                                placeholder="Title"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                        </div>

                        <div>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData("description", e.target.value)}
                                placeholder="Description"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                        </div>

                        <div>
                            <input
                                type="text"
                                value={data.image}
                                onChange={(e) => setData("image", e.target.value)}
                                placeholder="Image URL"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                        </div>

                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Create Blog
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </AuthenticatedLayout>
    );
}
