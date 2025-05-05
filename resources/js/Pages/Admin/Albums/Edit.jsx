import {router, useForm} from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ImageUpload from '@/Components/ImageUpload';
import React, {useState} from "react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function Edit({album}) {

    const [existingImage, setExistingImage] = useState(album.album_image);

    const {data, setData, patch, processing, errors} = useForm({
        album_name: album.album_name || '',
        released_date: album.released_date || '',
        album_image: null,  // Change to null for no file by default
        apple_link: album.apple_link || '',
        amazon_link: album.amazon_link || '',
        spotify_link: album.spotify_link || '',
        youtube_link: album.youtube_link || '',
        remove_image: false,
    });


    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PATCH');

        formData.append('album_name', data.album_name);
        formData.append('released_date', data.released_date);
        formData.append('apple_link', data.apple_link);
        formData.append('amazon_link', data.amazon_link);
        formData.append('spotify_link', data.spotify_link);
        formData.append('youtube_link', data.youtube_link);


        if (data.album_image) {
            formData.append('album_image', data.album_image);
        }

        formData.append('remove_image', data.remove_image ? '1' : '0');


        router.post(`/admin/albums/${album.id}`, formData, {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-[#1e242b]">
                <h1 className="text-2xl font-bold mb-4 text-white">Edit Album</h1>
                <form onSubmit={submit} encType="multipart/form-data">
                    {/* Album Name */}
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.album_name}
                            onChange={e => setData('album_name', e.target.value)}
                            placeholder="Album Name"
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white"
                        />
                        {errors.album_name && <div className="text-red-500 mt-1">{errors.album_name}</div>}
                    </div>

                    {/* Release Date */}
                    <div className="mb-4">
                        <input
                            type="date"
                            value={data.released_date}
                            onChange={e => setData('released_date', e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white"
                        />
                        {errors.released_date && <div className="text-red-500 mt-1">{errors.released_date}</div>}
                    </div>

                    {/* Image Upload */}
                    <div className="mb-4">
                        <label className="block text-white mb-2">Album Image</label>
                        <ImageUpload
                            initialImage={existingImage}
                            onChange={(file) => {
                                setData('album_image', file);

                            }}
                            onRemove={() => {
                                setExistingImage(null);
                                setData('album_image', null);
                                setData('remove_image', true);
                            }}
                        />
                        {errors.album_image && <div className="text-red-500 mt-1">{errors.album_image}</div>}
                    </div>

                    {/* Apple Music Link */}
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.apple_link}
                            onChange={e => setData('apple_link', e.target.value)}
                            placeholder="Apple Music Link"
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white"
                        />
                        {errors.apple_link && <div className="text-red-500 mt-1">{errors.apple_link}</div>}
                    </div>

                    {/* Amazon Link */}
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.amazon_link}
                            onChange={e => setData('amazon_link', e.target.value)}
                            placeholder="Amazon Link"
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white"
                        />
                        {errors.amazon_link && <div className="text-red-500 mt-1">{errors.amazon_link}</div>}
                    </div>

                    {/* Spotify Link */}
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.spotify_link}
                            onChange={e => setData('spotify_link', e.target.value)}
                            placeholder="Spotify Link"
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white"
                        />
                        {errors.spotify_link && <div className="text-red-500 mt-1">{errors.spotify_link}</div>}
                    </div>

                    {/* YouTube Link */}
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.youtube_link}
                            onChange={e => setData('youtube_link', e.target.value)}
                            placeholder="YouTube Link"
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white"
                        />
                        {errors.youtube_link && <div className="text-red-500 mt-1">{errors.youtube_link}</div>}
                    </div>

                    {/* Submit Button */}
                    <div>

                        <PrimaryButton
                            variant="danger"
                            type="submit"
                            disabled={processing}
                            className="p-0 mt-4 !bg-[#ff5252]"
                        >
                            {processing ? 'Updating...' : 'Update Album'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
