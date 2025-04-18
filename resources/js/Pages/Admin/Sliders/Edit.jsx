import React, { useState, useEffect } from 'react';
import {router, useForm} from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ImageUpload from "@/Components/ImageUpload.jsx";

const Edit = ({ slider }) => {
    const { data, setData, put, processing, errors } = useForm({
        slider_title: slider.slider_title,
        slider_short_description: slider.slider_short_description,
        slider_video_link: slider.slider_video_link || null,
        slider_image: null,
    });

    const [existingImage, setExistingImage] = useState(slider.slider_image);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PATCH');
        formData.append('slider_title', data.slider_title);
        formData.append('slider_short_description', data.slider_short_description);


        if (data.slider_video_link) {
            formData.append('slider_video_link', data.slider_video_link);
        }

        if (data.slider_image) {
            formData.append('slider_image', data.slider_image);
        }

        router.post(`/admin/sliders/${slider.id}`, formData,{
                forceFormData: true,
            }
        );
    };

    return (
        <AuthenticatedLayout>
            <div className="mx-auto bg-[#1e242b] p-6">
                <h1 className="text-3xl font-semibold mb-6 text-white">Edit Slider</h1>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                    <div>
                        <label htmlFor="slider_title" className="block text-white">Title</label>
                        <input
                            type="text"
                            id="slider_title"
                            name="slider_title"
                            value={data.slider_title}
                            onChange={(e) => setData("slider_title", e.target.value)}
                            className="w-full p-2 border border-[#232a32] rounded bg-[#1e242b] text-white placeholder-gray-400"
                        />
                        {errors.slider_title && <p className="text-red-600 text-sm">{errors.slider_title}</p>}
                    </div>

                    <div>
                        <label htmlFor="slider_short_description" className="block text-white">Short Description</label>
                        <textarea
                            id="slider_short_description"
                            name="slider_short_description"
                            value={data.slider_short_description}
                            onChange={(e) => setData("slider_short_description", e.target.value)}
                            className="w-full p-2 border border-[#232a32] rounded bg-[#1e242b] text-white placeholder-gray-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="slider_video_link" className="block text-white">Video Link</label>
                        <input
                            type="url"
                            id="slider_video_link"
                            name="slider_video_link"
                            value={data.slider_video_link}
                            onChange={(e) => setData("slider_video_link", e.target.value)}
                            className="w-full p-2 border border-[#232a32] rounded bg-[#1e242b] text-white placeholder-gray-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="slider_image" className="block text-white">Slider Image</label>

                        <ImageUpload
                            initialImage={existingImage}
                            onChange={(file) => {
                                setData('slider_image', file);

                            }}
                            onRemove={() => {
                                setExistingImage(null);
                                setData('slider_image', null);
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-[#ff5252] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#ff6161]"
                    >
                        {processing ? "Updating..." : "Update Slider"}
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
