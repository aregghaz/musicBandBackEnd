import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import ImageUpload from "@/Components/ImageUpload.jsx";
import React from "react";

export default function SliderCreate() {
    const { data, setData, post, processing, errors } = useForm({
        slider_title: "",
        slider_short_description: "",
        slider_video_link: "",
        slider_image: null,
        slider_image_mob: null,
        slider_title_color: "#ffffff",
        slider_title_size: 46,
        slider_short_desc_color: "#ffffff",
        slider_short_desc_size: 16,
        slider_title_size_mobile: 28,
        slider_short_desc_size_mobile: 13,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("sliders.store"), {
            forceFormData: true,
        });
    }

    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-[#1e242b]">
                <h1 className="text-3xl font-semibold mb-6 text-white">Create Slider</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="slider_title" className="block text-white">
                            Title
                        </label>
                        <input
                            type="text"
                            id="slider_title"
                            name="slider_title"
                            value={data.slider_title}
                            onChange={(e) => setData("slider_title", e.target.value)}
                            required
                            className="w-full p-2 rounded bg-[#1e242b] text-white placeholder-gray-400 border border-[#232a32]"
                        />
                        {errors.slider_title && (
                            <p className="text-red-600 text-sm">{errors.slider_title}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="slider_short_description" className="block text-white">
                            Short Description
                        </label>
                        <input
                            type="text"
                            id="slider_short_description"
                            name="slider_short_description"
                            value={data.slider_short_description}
                            onChange={(e) => setData("slider_short_description", e.target.value)}
                            required
                            className="w-full p-2 rounded bg-[#1e242b] text-white placeholder-gray-400 border border-[#232a32]"
                        />
                        {errors.slider_short_description && (
                            <p className="text-red-600 text-sm">{errors.slider_short_description}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="slider_video_link" className="block text-white">
                            Video Link
                        </label>
                        <input
                            type="url"
                            id="slider_video_link"
                            name="slider_video_link"
                            value={data.slider_video_link}
                            onChange={(e) => setData("slider_video_link", e.target.value)}
                            className="w-full p-2 rounded bg-[#1e242b] text-white placeholder-gray-400 border border-[#232a32]"
                        />
                        {errors.slider_video_link && (
                            <p className="text-red-600 text-sm">{errors.slider_video_link}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-white mb-2">Text Styling</label>
                        <div className="grid grid-cols-8 gap-4">
                            <div>
                                <label
                                    htmlFor="slider_title_color"
                                    className="block text-white text-sm"
                                >
                                    Title Color
                                </label>
                                <input
                                    type="color"
                                    id="slider_title_color"
                                    name="slider_title_color"
                                    value={data.slider_title_color}
                                    onChange={(e) => setData("slider_title_color", e.target.value)}
                                    required
                                    className="w-full h-8 p-1 rounded bg-[#1e242b] border border-[#232a32]"
                                />
                                {errors.slider_title_color && (
                                    <p className="text-red-600 text-xs">
                                        {errors.slider_title_color}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="slider_short_desc_color"
                                    className="block text-white text-sm"
                                >
                                    Description Color
                                </label>
                                <input
                                    type="color"
                                    id="slider_short_desc_color"
                                    name="slider_short_desc_color"
                                    value={data.slider_short_desc_color}
                                    onChange={(e) =>
                                        setData("slider_short_desc_color", e.target.value)
                                    }
                                    required
                                    className="w-full h-8 p-1 rounded bg-[#1e242b] border border-[#232a32]"
                                />
                                {errors.slider_short_desc_color && (
                                    <p className="text-red-600 text-xs">
                                        {errors.slider_short_desc_color}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="slider_title_size"
                                    className="block text-white text-sm"
                                >
                                    Title Size
                                </label>
                                <input
                                    type="number"
                                    id="slider_title_size"
                                    name="slider_title_size"
                                    value={data.slider_title_size}
                                    onChange={(e) =>
                                        setData("slider_title_size", parseInt(e.target.value))
                                    }
                                    required
                                    min="1"
                                    className="w-full p-2 rounded bg-[#1e242b] text-white placeholder-gray-400 border border-[#232a32]"
                                />
                                {errors.slider_title_size && (
                                    <p className="text-red-600 text-xs">
                                        {errors.slider_title_size}
                                    </p>
                                )}
                            </div>



                            <div>
                                <label
                                    htmlFor="slider_short_desc_size"
                                    className="block text-white text-sm"
                                >
                                    Description Size
                                </label>
                                <input
                                    type="number"
                                    id="slider_short_desc_size"
                                    name="slider_short_desc_size"
                                    value={data.slider_short_desc_size}
                                    onChange={(e) =>
                                        setData("slider_short_desc_size", parseInt(e.target.value))
                                    }
                                    required
                                    min="1"
                                    className="w-full p-2 rounded bg-[#1e242b] text-white placeholder-gray-400 border border-[#232a32]"
                                />
                                {errors.slider_short_desc_size && (
                                    <p className="text-red-600 text-xs">
                                        {errors.slider_short_desc_size}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="slider_title_size_mobile"
                                    className="block text-white text-sm"
                                >
                                    Mobile Title Size
                                </label>
                                <input
                                    type="number"
                                    id="slider_title_size_mobile"
                                    name="slider_title_size_mobile"
                                    value={data.slider_title_size_mobile}
                                    onChange={(e) =>
                                        setData("slider_title_size_mobile", parseInt(e.target.value))
                                    }
                                    required
                                    min="1"
                                    className="w-full p-2 rounded bg-[#1e242b] text-white placeholder-gray-400 border border-[#232a32]"
                                />
                                {errors.slider_title_size_mobile && (
                                    <p className="text-red-600 text-xs">
                                        {errors.slider_title_size_mobile}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="slider_short_desc_size_mobile"
                                    className="block text-white text-sm"
                                >
                                    Mobile Description Size
                                </label>
                                <input
                                    type="number"
                                    id="slider_short_desc_size_mobile"
                                    name="slider_short_desc_size_mobile"
                                    value={data.slider_short_desc_size_mobile}
                                    onChange={(e) =>
                                        setData(
                                            "slider_short_desc_size_mobile",
                                            parseInt(e.target.value)
                                        )
                                    }
                                    required
                                    min="1"
                                    className="w-full p-2 rounded bg-[#1e242b] text-white placeholder-gray-400 border border-[#232a32]"
                                />
                                {errors.slider_short_desc_size_mobile && (
                                    <p className="text-red-600 text-xs">
                                        {errors.slider_short_desc_size_mobile}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="slider_image" className="block text-white">
                            Image
                        </label>
                        <small className="block mb-4">recommended size 1600 x 800</small>
                        <ImageUpload
                            onChange={(file) => setData("slider_image", file)}
                            initialImage={null}
                            cropWidth={1600}
                            cropHeight={800}
                        />
                        {errors.slider_image && (
                            <p className="text-red-600 text-sm">{errors.slider_image}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="slider_image_mob" className="block text-white">
                            Slider Mobile Image
                        </label>
                        <small className="block mb-4">recommended size 472 x 500</small>
                        <ImageUpload
                            initialImage={null}
                            onChange={(file) => setData("slider_image_mob", file)}
                            cropWidth={472}
                            cropHeight={500}
                        />
                        {errors.slider_image_mob && (
                            <p className="text-red-600 text-sm">{errors.slider_image_mob}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-[#ff5252] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#ff6161] transition duration-300"
                    >
                        {processing ? "Saving..." : "Create Slider"}
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
