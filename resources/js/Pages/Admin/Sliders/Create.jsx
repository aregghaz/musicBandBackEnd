import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

export default function SliderCreate() {
    const { data, setData, post, processing, errors } = useForm({
        slider_title: "",
        slider_short_description: "",
        slider_video_link: "",
        slider_image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("sliders.store"));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Create Slider</h2>}
        >
            <div className="p-8 bg-gray-50 min-h-screen">
                <h1 className="text-3xl font-semibold mb-6 text-gray-800">Create Slider</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="slider_title" className="block text-gray-700">Title</label>
                        <input
                            type="text"
                            id="slider_title"
                            name="slider_title"
                            value={data.slider_title}
                            onChange={(e) => setData("slider_title", e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.slider_title && <p className="text-red-600 text-sm">{errors.slider_title}</p>}
                    </div>

                    <div>
                        <label htmlFor="slider_short_description" className="block text-gray-700">Short Description</label>
                        <input
                            type="text"
                            id="slider_short_description"
                            name="slider_short_description"
                            value={data.slider_short_description}
                            onChange={(e) => setData("slider_short_description", e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.slider_short_description && <p className="text-red-600 text-sm">{errors.slider_short_description}</p>}
                    </div>

                    <div>
                        <label htmlFor="slider_video_link" className="block text-gray-700">Video Link</label>
                        <input
                            type="text"
                            id="slider_video_link"
                            name="slider_video_link"
                            value={data.slider_video_link}
                            onChange={(e) => setData("slider_video_link", e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.slider_video_link && <p className="text-red-600 text-sm">{errors.slider_video_link}</p>}
                    </div>

                    <div>
                        <label htmlFor="slider_image" className="block text-gray-700">Image</label>
                        <input
                            type="file"
                            id="slider_image"
                            name="slider_image"
                            disabled
                            onChange={(e) => setData("slider_image", e.target.files[0])}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {errors.slider_image && <p className="text-red-600 text-sm">{errors.slider_image}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        {processing ? "Saving..." : "Create Slider"}
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
