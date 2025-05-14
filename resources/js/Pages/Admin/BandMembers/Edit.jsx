import { useForm, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ImageUpload from '@/Components/ImageUpload';
import MultipleImageUpload from '@/Components/MultipleImageUpload';
import React, { useState } from 'react';
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function Edit() {
    const { bandMember } = usePage().props;

    const { data, setData, errors, processing } = useForm({
        first_name: bandMember.first_name || '',
        last_name: bandMember.last_name || '',
        role: bandMember.role || '',
        band_member_image: null,
        remove_image: false,
        band_member_images: Array.isArray(bandMember.band_member_images)
            ? bandMember.band_member_images.map((path) => ({
                file: null,
                preview: path,
            }))
            : [],
        country: bandMember.country || '',
        description: bandMember.description || '',
        facebook_link: bandMember.facebook_link || '',
        instagram_link: bandMember.instagram_link || '',
        wikipedia_link: bandMember.wikipedia_link || '',
        webpage_link: bandMember.webpage_link || '',
        youtube_link: bandMember.youtube_link || '',
        is_active: bandMember.is_active || false,
        order: bandMember.order || 0, // Added order field
    });

    const [existingImage, setExistingImage] = useState(bandMember.band_member_image);

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PATCH');
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);
        formData.append('role', data.role);
        formData.append('country', data.country);
        formData.append('description', data.description);
        formData.append('facebook_link', data.facebook_link);
        formData.append('instagram_link', data.instagram_link);
        formData.append('wikipedia_link', data.wikipedia_link);
        formData.append('webpage_link', data.webpage_link);
        formData.append('youtube_link', data.youtube_link);
        formData.append('is_active', data.is_active ? '1' : '0');
        formData.append('order', data.order.toString()); // Added order

        if (data.band_member_image) {
            formData.append('band_member_image', data.band_member_image);
        }

        formData.append('remove_image', data.remove_image ? '1' : '0');

        // Append new gallery images (only File objects)
        let fileIndex = 0;
        data.band_member_images.forEach((image) => {
            if (image.file instanceof File) {
                formData.append(`band_member_images[${fileIndex}]`, image.file);
                fileIndex++;
            }
        });

        // Append existing image paths (exclude blob URLs)
        data.band_member_images.forEach((image, index) => {
            if (!image.preview.startsWith('blob:')) {
                formData.append(`image_paths[${index}]`, image.preview);
            }
        });

        router.post(`/admin/band-members/${bandMember.id}`, formData, {
            forceFormData: true,
        });
    };

    // Handle multiple images change
    const handleMultipleImages = (newImages) => {
        const updatedImages = newImages.map((img) => ({
            file: img instanceof File ? img : null,
            preview: img instanceof File ? URL.createObjectURL(img) : img,
        }));
        setData({
            ...data,
            band_member_images: updatedImages,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Band Member
                </h2>
            }
        >
            <div className="p-6 bg-[#1e242b]">
                <h1 className="text-2xl font-bold mb-6 text-white">Edit Band Member</h1>

                <div className="bg-[#1e242b] shadow-md rounded-lg p-6">
                    <form onSubmit={submit}>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div>
                                <label className="block text-white font-medium mb-2">First Name</label>
                                <input
                                    type="text"
                                    value={data.first_name}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                    className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 border border-[#232a32] focus:outline-none focus:ring-2 focus:ring-[#ff5252]"
                                    placeholder="Enter First Name"
                                />
                                {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
                            </div>

                            <div>
                                <label className="block text-white font-medium mb-2">Last Name</label>
                                <input
                                    type="text"
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                    className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 border border-[#232a32] focus:outline-none focus:ring-2 focus:ring-[#ff5252]"
                                    placeholder="Enter Last Name"
                                />
                                {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
                            </div>

                            <div>
                                <label className="block text-white font-medium mb-2">Role</label>
                                <input
                                    type="text"
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 border border-[#232a32] focus:outline-none focus:ring-2 focus:ring-[#ff5252]"
                                    placeholder="Enter Role (e.g. Guitarist, Drummer)"
                                />
                                {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                            </div>

                            <div>
                                <label className="block text-white font-medium mb-2">Country</label>
                                <input
                                    type="text"
                                    value={data.country}
                                    onChange={(e) => setData('country', e.target.value)}
                                    className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 border border-[#232a32] focus:outline-none focus:ring-2 focus:ring-[#ff5252]"
                                    placeholder="Enter Country"
                                />
                                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                            </div>

                            <div>
                                <label className="block text-white font-medium mb-2">Order</label>
                                <input
                                    type="number"
                                    value={data.order}
                                    onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 border border-[#232a32] focus:outline-none focus:ring-2 focus:ring-[#ff5252]"
                                    placeholder="Enter Order"
                                    min="0"
                                />
                                {errors.order && <p className="text-red-500 text-sm mt-1">{errors.order}</p>}
                            </div>
                        </div>

                        {/* Description (Full Width) */}
                        <div className="mb-6">
                            <label className="block text-white font-medium mb-2">Description</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 border border-[#232a32] focus:outline-none focus:ring-2 focus:ring-[#ff5252] min-h-[100px]"
                                placeholder="Enter Description"
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>

                        {/* Grid for Social Links */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div>
                                <label className="block text-white font-medium mb-2">Facebook Link</label>
                                <input
                                    type="text"
                                    value={data.facebook_link}
                                    onChange={(e) => setData('facebook_link', e.target.value)}
                                    className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 border border-[#232a32] focus:outline-none focus:ring-2 focus:ring-[#ff5252]"
                                    placeholder="Enter Facebook Link"
                                />
                                {errors.facebook_link && <p className="text-red-500 text-sm mt-1">{errors.facebook_link}</p>}
                            </div>

                            <div>
                                <label className="block text-white font-medium mb-2">Instagram Link</label>
                                <input
                                    type="text"
                                    value={data.instagram_link}
                                    onChange={(e) => setData('instagram_link', e.target.value)}
                                    className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 border border-[#232a32] focus:outline-none focus:ring-2 focus:ring-[#ff5252]"
                                    placeholder="Enter Instagram Link"
                                />
                                {errors.instagram_link && <p className="text-red-500 text-sm mt-1">{errors.instagram_link}</p>}
                            </div>

                            <div>
                                <label className="block text-white font-medium mb-2">Wikipedia Link</label>
                                <input
                                    type="text"
                                    value={data.wikipedia_link}
                                    onChange={(e) => setData('wikipedia_link', e.target.value)}
                                    className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 border border-[#232a32] focus:outline-none focus:ring-2 focus:ring-[#ff5252]"
                                    placeholder="Enter Wikipedia Link"
                                />
                                {errors.wikipedia_link && <p className="text-red-500 text-sm mt-1">{errors.wikipedia_link}</p>}
                            </div>

                            <div>
                                <label className="block text-white font-medium mb-2">Webpage Link</label>
                                <input
                                    type="text"
                                    value={data.webpage_link}
                                    onChange={(e) => setData('webpage_link', e.target.value)}
                                    className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 border border-[#232a32] focus:outline-none focus:ring-2 focus:ring-[#ff5252]"
                                    placeholder="Enter Webpage Link"
                                />
                                {errors.webpage_link && <p className="text-red-500 text-sm mt-1">{errors.webpage_link}</p>}
                            </div>

                            <div>
                                <label className="block text-white font-medium mb-2">YouTube Link</label>
                                <input
                                    type="text"
                                    value={data.youtube_link}
                                    onChange={(e) => setData('youtube_link', e.target.value)}
                                    className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 border border-[#232a32] focus:outline-none focus:ring-2 focus:ring-[#ff5252]"
                                    placeholder="Enter YouTube Link"
                                />
                                {errors.youtube_link && <p className="text-red-500 text-sm mt-1">{errors.youtube_link}</p>}
                            </div>
                        </div>

                        {/* Active Status */}
                        <div className="mb-6 flex items-center">
                            <input
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="mr-2 h-5 w-5 text-[#ff5252] border-[#232a32] focus:ring-[#ff5252]"
                            />
                            <label className="text-white">Is Active</label>
                            {errors.is_active && <p className="text-red-500 text-sm ml-2">{errors.is_active}</p>}
                        </div>

                        {/* Single Image Upload (Full Width) */}
                        <div className="mb-6">
                            <label className="block text-white font-medium">Band Member Image</label>
                            <small className='block mb-4'>recommended size 340 x 450</small>
                            <ImageUpload
                                initialImage={existingImage}
                                onChange={(file) => {
                                    setData('band_member_image', file);
                                    if (file) {
                                        setExistingImage(null);
                                        setData('remove_image', false);
                                    }
                                }}
                                onRemove={() => {
                                    setExistingImage(null);
                                    setData('band_member_image', null);
                                    setData('remove_image', true);
                                }}
                                cropWidth={340}
                                cropHeight={450}
                            />
                            {errors.band_member_image && (
                                <p className="text-red-500 text-sm mt-1">{errors.band_member_image}</p>
                            )}
                        </div>

                        {/* Multiple Image Upload (Full Width) */}
                        <div className="mb-6">
                            <label className="block text-white font-medium mb-2">Gallery Images</label>
                            <small className='block mb-4'>recommended size 300 x 300</small>
                            <MultipleImageUpload
                                onChange={handleMultipleImages}
                                initialImages={data.band_member_images}
                                cropHeight={300}
                                cropWidth={300}
                            />
                            {errors.band_member_images && (
                                <p className="text-red-500 text-sm mt-1">{errors.band_member_images}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <PrimaryButton
                            variant="danger"
                            type="submit"
                            disabled={processing}
                            className="p-0 w-48 text-center !bg-[#ff5252] hover:!bg-[#ff6161]"
                        >
                            {processing ? 'Updating...' : 'Update Band Member'}
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
