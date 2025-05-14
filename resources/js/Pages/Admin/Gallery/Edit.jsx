import React, { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import PrimaryButton from '@/Components/PrimaryButton.jsx';
import MultipleImageUpload from '@/Components/MultipleImageUpload.jsx';

export default function GalleryEdit() {
    const { category } = usePage().props;
    const [folderName, setFolderName] = useState(category?.folder_name || '');
    const [newImages, setNewImages] = useState([]);
    const [newDescriptions, setNewDescriptions] = useState([]);
    const [existingImages, setExistingImages] = useState(
        (category?.galleries || []).map(item => ({
            id: item.id,
            preview: `/storage/${item.gallery_image}`,
            description: item.gallery_image_description || ''
        }))
    );

    const handleImageChange = (files) => {
        const updatedImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        setNewImages(updatedImages);
        setNewDescriptions(new Array(files.length).fill(''));
    };

    const handleDescriptionChange = (index, value, isExisting = false) => {
        if (isExisting) {
            const updatedImages = [...existingImages];
            updatedImages[index].description = value;
            setExistingImages(updatedImages);
        } else {
            const updatedDescriptions = [...newDescriptions];
            updatedDescriptions[index] = value;
            setNewDescriptions(updatedDescriptions);
        }
    };

    const handleDeleteImage = (id) => {
        if (confirm('Are you sure you want to delete this image?')) {
            router.delete(route('gallery.image.destroy', id), {
                onSuccess: () => {
                    setExistingImages(existingImages.filter(img => img.id !== id));
                }
            });
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (!folderName) {
            alert('Folder name is required.');
            return;
        }

        const formData = new FormData();
        formData.append('folder_name', folderName);
        formData.append('_method', 'PUT');
        newImages.forEach(image => formData.append('gallery_images[]', image.file));
        newDescriptions.forEach(desc => formData.append('gallery_image_descriptions[]', desc));
        existingImages.forEach(img => {
            formData.append('existing_images[]', img.id);
            formData.append('existing_descriptions[]', img.description);
        });

        router.post(route('gallery.update', category.id), formData, {
            forceFormData: true,
            onSuccess: () => {
                setNewImages([]);
                setNewDescriptions([]);
            }
        });
    };

    useEffect(() => {
        return () => {
            newImages.forEach(image => URL.revokeObjectURL(image.preview));
        };
    }, [newImages]);

    return (
        <AuthenticatedLayout>
            <div className="py-6 px-4 lg:px-8 bg-[#13181d] min-h-screen">
                <h2 className="text-2xl mb-4 text-white">Edit Gallery Folder</h2>

                <div className="mb-6">
                    <label className="block text-white mb-2">Folder Name</label>
                    <input
                        type="text"
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                        className="w-56 bg-[#1e242b]  text-white p-2 rounded"
                        placeholder="Enter folder name"
                    />
                </div>

                <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {existingImages.length > 0 ? (
                        existingImages.map((item, index) => (
                            <div
                                key={item.id}
                                className="relative w-full h-80 bg-[#222] rounded overflow-hidden flex items-center justify-center shadow"
                            >
                                <img
                                    src={item.preview}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                                <textarea
                                    value={item.description}
                                    onChange={(e) => handleDescriptionChange(index, e.target.value, true)}
                                    className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white p-2"
                                    placeholder="Enter image description"
                                />
                                <button
                                    onClick={() => handleDeleteImage(item.id)}
                                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                                >
                                    ✕
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-white">No images found for this category.</p>
                    )}
                    {newImages.map((image, index) => (
                        <div
                            key={`${image.preview}-${index}`}
                            className="relative w-full h-80 bg-[#222] rounded overflow-hidden flex items-center justify-center shadow"
                        >
                            <img
                                src={image.preview}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                            <textarea
                                value={newDescriptions[index] || ''}
                                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                                className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white p-2"
                                placeholder="Enter image description"
                            />
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-4">
                    <small className="block text-white">Recommended size 340 x 450</small>
                    <MultipleImageUpload
                        initialImages={newImages}
                        onChange={handleImageChange}
                        cropWidth={340}
                        cropHeight={450}
                    />
                    <PrimaryButton
                        onClick={handleSave}
                        className="p-0 w-28 text-center !bg-[#ff5252]"
                    >
                        Save
                    </PrimaryButton>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
