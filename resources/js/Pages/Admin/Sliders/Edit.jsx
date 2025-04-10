import React, {useState, useEffect} from 'react';
import {useForm} from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Edit = ({slider}) => {
    const {data, setData, put, processing, errors} = useForm({
        slider_title: slider.slider_title,
        slider_short_description: slider.slider_short_description,
        slider_video_link: slider.slider_video_link
    });

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Create FormData for the form fields
        const formData = new FormData();
        formData.append('slider_title', data.slider_title);
        formData.append('slider_short_description', data.slider_short_description);
        formData.append('slider_video_link', data.slider_video_link);

        // Send the form data to update the slider
        put(`/admin/sliders/${slider.id}`, {
            data: formData,
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto mt-8">
                <h1 className="text-3xl font-bold mb-6">Edit Slider</h1>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Title</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={data.slider_title}
                            onChange={(e) => setData('slider_title', e.target.value)}
                        />
                        {errors.slider_title && <div className="text-red-500">{errors.slider_title}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Short Description</label>
                        <textarea
                            className="w-full p-2 border rounded"
                            value={data.slider_short_description}
                            onChange={(e) => setData('slider_short_description', e.target.value)}
                        />
                    </div>


                    <div className="mb-4">
                        <label className="block text-sm font-medium">Video Link</label>
                        <input
                            type="url"
                            className="w-full p-2 border rounded"
                            value={data.slider_video_link}
                            onChange={(e) => setData('slider_video_link', e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium">Slider Image</label>
                        <input
                            type="file"
                            className="w-full p-2 border rounded"
                            disabled
                            onChange={(e) => setData('slider_image', e.target.files[0])}
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={processing}>Update
                        Slider
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
