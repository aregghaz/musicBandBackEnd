import { useForm, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import ImageUpload from "@/Components/ImageUpload.jsx";
import React from "react";

export default function Create() {
    const { data, setData, errors, reset } = useForm({
        title: "",
        description: "",
        image: null,
        topicLink: "",
    });

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description || "");
        if (data.image) {
            formData.append("image", data.image);
        }
        formData.append("topicLink", data.topicLink);

        router.post("/admin/about-us-news", formData);
    };

    return (
        <AuthenticatedLayout>
            <div className="flex justify-center items-center min-h-screen bg-[#13181d]">
                <div className="max-w-2xl w-full p-6 bg-[#1e242b] rounded-lg shadow-md">
                    <h1 className="text-3xl font-semibold mb-6 text-center text-white">Create About Us News</h1>

                    <form onSubmit={submit}>
                        <div className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData("title", e.target.value)}
                                    placeholder="Title *"
                                    required
                                    className="w-full p-3 border border-[#232a32] rounded-md bg-[#1e242b] text-white"
                                />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                            </div>

                            <div>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                    placeholder="Description"
                                    className="w-full p-3 border border-[#232a32] rounded-md bg-[#1e242b] text-white"
                                />
                                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                            </div>

                            <div>
                                <input
                                    type="url"
                                    value={data.topicLink}
                                    onChange={(e) => setData("topicLink", e.target.value)}
                                    placeholder="Topic Link * (e.g., https://example.com)"
                                    required
                                    className="w-full p-3 border border-[#232a32] rounded-md bg-[#1e242b] text-white"
                                />
                                {errors.topicLink && <p className="text-red-500 text-sm">{errors.topicLink}</p>}
                            </div>

                            <div>
                                <small className='block mb-4'>recommended size 540 x 450</small>
                                <ImageUpload
                                    initialImage={null}
                                    onChange={(file) => setData("image", file)}
                                    cropWidth={540}
                                    cropHeight={450}
                                />
                                {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full py-3 bg-[#ff5252] text-white rounded-md hover:bg-[#ff6161]"
                            >
                                Create News
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
