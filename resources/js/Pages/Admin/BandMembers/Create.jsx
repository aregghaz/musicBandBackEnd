import { useForm } from '@inertiajs/react';
import MultipleImageUpload from '@/Components/MultipleImageUpload'; // Import the custom multiple image upload component
import ImageUpload from '@/Components/ImageUpload'; // Import the existing image upload component
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import React from "react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        role: '',
        country: '',
        description: '',
        facebook_link: '',
        instagram_link: '',
        wikipedia_link: '',
        webpage_link: '',
        youtube_link: '',
        is_active: false,
        band_member_image: null, // Single image
        band_member_images: [], // Multiple images
    });

    function submit(e) {
        e.preventDefault();

        post(route('band-members.store'), {
            forceFormData: true
        });
    }

    // Handle multiple images
    function handleMultipleImages(newImages) {
        setData('band_member_images', newImages);
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Band Member
                </h2>
            }
        >
            <div className="p-6 bg-[#1e242b]">
                <h1 className="text-2xl font-bold mb-4 text-white">Create Band Member</h1>
                <form onSubmit={submit}>
                    {/* Name, Last Name, Role inputs */}
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.first_name}
                            onChange={e => setData('first_name', e.target.value)}
                            placeholder="First Name"
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400"
                        />
                        {errors.first_name && <div className="text-red-500">{errors.first_name}</div>}
                    </div>

                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.last_name}
                            onChange={e => setData('last_name', e.target.value)}
                            placeholder="Last Name"
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400"
                        />
                        {errors.last_name && <div className="text-red-500">{errors.last_name}</div>}
                    </div>

                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.role}
                            onChange={e => setData('role', e.target.value)}
                            placeholder="Role"
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400"
                        />
                        {errors.role && <div className="text-red-500">{errors.role}</div>}
                    </div>

                    {/* Additional Fields */}
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.country}
                            onChange={e => setData('country', e.target.value)}
                            placeholder="Country"
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400"
                        />
                        {errors.country && <div className="text-red-500">{errors.country}</div>}
                    </div>

                    <div className="mb-4">
                        <textarea
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            placeholder="Description"
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400"
                        />
                        {errors.description && <div className="text-red-500">{errors.description}</div>}
                    </div>

                    {/* Social Links */}
                    <div className="mb-4">
                        <input
                            type="url"
                            value={data.facebook_link}
                            onChange={e => setData('facebook_link', e.target.value)}
                            placeholder="Facebook Link"
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400"
                        />
                        {errors.facebook_link && <div className="text-red-500">{errors.facebook_link}</div>}
                    </div>

                    <div className="mb-4">
                        <input
                            type="url"
                            value={data.instagram_link}
                            onChange={e => setData('instagram_link', e.target.value)}
                            placeholder="Instagram Link"
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400"
                        />
                        {errors.instagram_link && <div className="text-red-500">{errors.instagram_link}</div>}
                    </div>

                    <div className="mb-4">
                        <input
                            type="url"
                            value={data.wikipedia_link}
                            onChange={e => setData('wikipedia_link', e.target.value)}
                            placeholder="Wikipedia Link"
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400"
                        />
                        {errors.wikipedia_link && <div className="text-red-500">{errors.wikipedia_link}</div>}
                    </div>

                    <div className="mb-4">
                        <input
                            type="url"
                            value={data.webpage_link}
                            onChange={e => setData('webpage_link', e.target.value)}
                            placeholder="Webpage Link"
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400"
                        />
                        {errors.webpage_link && <div className="text-red-500">{errors.webpage_link}</div>}
                    </div>

                    <div className="mb-4">
                        <input
                            type="url"
                            value={data.youtube_link}
                            onChange={e => setData('youtube_link', e.target.value)}
                            placeholder="YouTube Link"
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400"
                        />
                        {errors.youtube_link && <div className="text-red-500">{errors.youtube_link}</div>}
                    </div>

                    {/* Active Status */}
                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            checked={data.is_active}
                            onChange={e => setData('is_active', e.target.checked)}
                            className="mr-2"
                        />
                        <label className="text-white">Is Active</label>
                        {errors.is_active && <div className="text-red-500">{errors.is_active}</div>}
                    </div>

                    {/* Single Image Upload */}
                    <div className="mb-4">
                        <ImageUpload
                            onChange={file => setData('band_member_image', file)}
                            initialImage={null}
                        />
                        {errors.band_member_image && (
                            <div className="text-red-500">{errors.band_member_image}</div>
                        )}
                    </div>

                    {/* Multiple Image Upload using MultipleImageUpload component */}
                    <div className="mb-4">
                        <MultipleImageUpload
                            onChange={handleMultipleImages}
                            initialImages={data.band_member_images.map(image => {
                                if (image instanceof File) {
                                    return {
                                        file: image,
                                        preview: URL.createObjectURL(image),
                                    };
                                }
                                return {
                                    file: null,
                                    preview: `/storage/band-member-images/${image.path}`,
                                };
                            })}
                        />
                        {errors.band_member_images && (
                            <div className="text-red-500">{errors.band_member_images}</div>
                        )}
                    </div>

                    {/*<button*/}
                    {/*    type="submit"*/}
                    {/*    disabled={processing}*/}
                    {/*    className="w-full px-4 py-2 bg-[#ff5252] text-white rounded-md hover:bg-[#ff6161] disabled:opacity-50"*/}
                    {/*>*/}
                    {/*    */}
                    {/*</button>*/}

                    <PrimaryButton
                        variant="danger"
                        type="submit"
                        disabled={processing}
                        className="p-0 mt-4 !bg-[#ff5252]"
                    >
                        {processing ? 'Creating...' : 'Create Band Member'}
                    </PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
