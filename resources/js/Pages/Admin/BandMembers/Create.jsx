import { useForm } from '@inertiajs/react';
import MultipleImageUpload from '@/Components/MultipleImageUpload';
import ImageUpload from '@/Components/ImageUpload';
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
        band_member_image: null,
        band_member_images: [],
        order: 0,
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
                <h1 className="text-2xl font-bold mb-6 text-white">Create Band Member</h1>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                            <input
                                type="text"
                                value={data.first_name}
                                onChange={e => setData('first_name', e.target.value)}
                                placeholder="First Name"
                                className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 border border-[#232a32] focus:outline-none focus:ring-2 focus:ring-[#ff5252]"
                            />
                            {errors.first_name && <div className="text-red-500 text-sm mt-1">{errors.first_name}</div>}
                        </div>

                        <div>
                            <input
                                type="text"
                                value={data.last_name}
                                onChange={e => setData('last_name', e.target.value)}
                                placeholder="Last Name"
                                className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 border border-[#232a32] focus:outline-none focus:ring-2 focus:ring-[#ff5252]"
                            />
                            {errors.last_name && <div className="text-red-500 text-sm mt-1">{errors.last_name}</div>}
                        </div>

                        <div>
                            <input
                                type="text"
                                value={data.role}
                                onChange={e => setData('role', e.target.value)}
                                placeholder="Role"
                                className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 border border-[#232a32] focus:outline-none focus:ring-2 focus:ring-[#ff5252]"
                            />
                            {errors.role && <div className="text-red-500 text-sm mt-1">{errors.role}</div>}
                        </div>

                        <div>
                            <input
                                type="text"
                                value={data.country}
                                onChange={e => setData('country', e.target.value)}
                                placeholder="Country"
                                className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 border border-[#232a32] focus:outline-none focus:ring-2 focus:ring-[#ff5252]"
                            />
                            {errors.country && <div className="text-red-500 text-sm mt-1">{errors.country}</div>}
                        </div>

                        <div>
                            <input
                                type="number"
                                value={data.order}
                                onChange={e => setData('order', parseInt(e.target.value) || 0)}
                                placeholder="Order"
                                min="0"
                                className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 border border-[#232a32] focus:outline-none focus:ring-2 focus:ring-[#ff5252]"
                            />
                            {errors.order && <div className="text-red-500 text-sm mt-1">{errors.order}</div>}
                        </div>
                    </div>

                    {/* Description (Full Width) */}
                    <div className="mb-6">
                        <textarea
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            placeholder="Description"
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 border border-[#232a32] focus:outline-none focus:ring-2 focus:ring-[#ff5252] min-h-[100px]"
                        />
                        {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                    </div>

                    {/* Grid for Social Links */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                            <input
                                type="url"
                                value={data.facebook_link}
                                onChange={e => setData('facebook_link', e.target.value)}
                                placeholder="Facebook Link"
                                className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 border border-[#232a32] focus:outline-none focus:ring-2 focus:ring-[#ff5252]"
                            />
                            {errors.facebook_link && <div className="text-red-500 text-sm mt-1">{errors.facebook_link}</div>}
                        </div>

                        <div>
                            <input
                                type="url"
                                value={data.instagram_link}
                                onChange={e => setData('instagram_link', e.target.value)}
                                placeholder="Instagram Link"
                                className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 border border-[#232a32] focus:outline-none focus:ring-2 focus:ring-[#ff5252]"
                            />
                            {errors.instagram_link && <div className="text-red-500 text-sm mt-1">{errors.instagram_link}</div>}
                        </div>

                        <div>
                            <input
                                type="url"
                                value={data.wikipedia_link}
                                onChange={e => setData('wikipedia_link', e.target.value)}
                                placeholder="Wikipedia Link"
                                className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 border border-[#232a32] focus:outline-none focus:ring-2 focus:ring-[#ff5252]"
                            />
                            {errors.wikipedia_link && <div className="text-red-500 text-sm mt-1">{errors.wikipedia_link}</div>}
                        </div>

                        <div>
                            <input
                                type="url"
                                value={data.webpage_link}
                                onChange={e => setData('webpage_link', e.target.value)}
                                placeholder="Webpage Link"
                                className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 border border-[#232a32] focus:outline-none focus:ring-2 focus:ring-[#ff5252]"
                            />
                            {errors.webpage_link && <div className="text-red-500 text-sm mt-1">{errors.webpage_link}</div>}
                        </div>

                        <div>
                            <input
                                type="url"
                                value={data.youtube_link}
                                onChange={e => setData('youtube_link', e.target.value)}
                                placeholder="YouTube Link"
                                className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 border border-[#232a32] focus:outline-none focus:ring-2 focus:ring-[#ff5252]"
                            />
                            {errors.youtube_link && <div className="text-red-500 text-sm mt-1">{errors.youtube_link}</div>}
                        </div>
                    </div>

                    {/* Active Status */}
                    <div className="mb-6 flex items-center">
                        <input
                            type="checkbox"
                            checked={data.is_active}
                            onChange={e => setData('is_active', e.target.checked)}
                            className="mr-2 h-5 w-5 text-[#ff5252] border-[#232a32] focus:ring-[#ff5252]"
                        />
                        <label className="text-white">Is Active</label>
                        {errors.is_active && <div className="text-red-500 text-sm ml-2">{errors.is_active}</div>}
                    </div>

                    {/* Single Image Upload (Full Width) */}
                    <div className="mb-6">
                        <label className="block text-white font-medium mb-2">Band Member Image</label>
                        <small className='block mb-4'>recommended size 340 x 450</small>
                        <ImageUpload
                            onChange={file => setData('band_member_image', file)}
                            initialImage={null}
                            cropWidth={340}
                            cropHeight={450}
                        />
                        {errors.band_member_image && (
                            <div className="text-red-500 text-sm mt-1">{errors.band_member_image}</div>
                        )}
                    </div>

                    {/* Multiple Image Upload (Full Width) */}
                    <div className="mb-6">
                        <label className="block text-white font-medium mb-2">Gallery Images</label>
                        <small className='block mb-4'>recommended size 300 x 300</small>
                        <MultipleImageUpload
                            onChange={handleMultipleImages}
                            // cropHeight={300}
                            // cropWidth={300}
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
                            <div className="text-red-500 text-sm mt-1">{errors.band_member_images}</div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <PrimaryButton
                        variant="danger"
                        type="submit"
                        disabled={processing}
                        className="p-0 w-48 text-center !bg-[#ff5252] hover:!bg-[#ff6161]"
                    >
                        {processing ? 'Creating...' : 'Create Band Member'}
                    </PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
