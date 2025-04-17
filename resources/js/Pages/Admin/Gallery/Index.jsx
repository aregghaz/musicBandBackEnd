import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function GalleryIndex() {
    const { galleries } = usePage().props;
    const [newImages, setNewImages] = useState([]);

    const handleImageChange = (e) => {
        setNewImages([...newImages, ...e.target.files]);
    };

    const handleImageRemove = (index) => {
        const updatedImages = [...newImages];
        updatedImages.splice(index, 1);
        setNewImages(updatedImages);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this image?')) {
            router.delete(route('gallery.destroy', id));
        }
    };

    const handleSave = (e) => {
        e.preventDefault();

        if (newImages.length === 0) {
            alert('No images selected.');
            return;
        }

        const formData = new FormData();
        newImages.forEach(image => formData.append('gallery_images[]', image));

        router.post(route('gallery.store'), formData, {
            forceFormData: true,
            onSuccess: () => setNewImages([])
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="py-6 px-4 lg:px-8 bg-[#13181d] min-h-screen">
                <h2 className="text-2xl mb-4 text-white">Gallery</h2>

                {/* Gallery Grid */}
                <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {galleries.map(item => (
                        <div
                            key={item.id}
                            className="relative w-full h-80 bg-[#222] rounded overflow-hidden flex items-center justify-center shadow"
                        >
                            <img
                                src={`/storage/${item.gallery_image}`}
                                alt=""
                                className="w-full h-full"
                            />
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    {newImages.map((image, index) => (
                        <div
                            key={index}
                            className="relative w-full h-80 bg-[#222] rounded overflow-hidden flex items-center justify-center shadow"
                        >
                            <img
                                src={URL.createObjectURL(image)}
                                alt=""
                                className="w-full h-full "
                            />
                            <button
                                onClick={() => handleImageRemove(index)}
                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                {/* Upload & Save Controls */}
                <div className="flex flex-col gap-4">
                    <div>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="text-white"
                        />
                    </div>

                    <div>
                        <PrimaryButton
                            variant="danger"
                            onClick={handleSave}
                            className="p-0 !bg-[#ff5252]"
                        >
                            Save
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
