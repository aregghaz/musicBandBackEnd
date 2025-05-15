import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import PrimaryButton from '@/Components/PrimaryButton.jsx';
import MultipleImageUpload from '@/Components/MultipleImageUpload.jsx';
import ImageUpload from '@/Components/ImageUpload.jsx';

export default function GalleryCreate() {
    const [folderName, setFolderName] = useState('');
    const [categoryImage, setCategoryImage] = useState(null);
    const [newImages, setNewImages] = useState([]);
    const [descriptions, setDescriptions] = useState([]);

    const handleCategoryImageChange = (file) => {
        setCategoryImage(file);
    };

    const handleImageChange = (files) => {
        const updatedImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        setNewImages(updatedImages);
        setDescriptions(new Array(files.length).fill(''));
    };

    const handleDescriptionChange = (index, value) => {
        const updatedDescriptions = [...descriptions];
        updatedDescriptions[index] = value;
        setDescriptions(updatedDescriptions);
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (!folderName) {
            alert('Folder name is required.');
            return;
        }
        if (newImages.length === 0 && !categoryImage) {
            alert('At least one image (category or gallery) is required.');
            return;
        }

        const formData = new FormData();
        formData.append('folder_name', folderName);
        if (categoryImage) {
            formData.append('gallery_category_image', categoryImage);
        }
        newImages.forEach(image => formData.append('gallery_images[]', image.file));
        descriptions.forEach(desc => formData.append('gallery_image_descriptions[]', desc));

        router.post(route('gallery.store'), formData, {
            forceFormData: true,
            onSuccess: () => {
                setNewImages([]);
                setDescriptions([]);
                setFolderName('');
                setCategoryImage(null);
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
                <h2 className="text-2xl mb-4 text-white">Create Gallery Folder</h2>

                <div className="mb-6">
                    <label className="block text-white mb-2">Folder Name</label>
                    <input
                        type="text"
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                        className="w-56 bg-[#1e242b] text-white p-2 rounded"
                        placeholder="Enter folder name"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-white mb-2">Category Image</label>
                    <small className="block text-white mb-4">Recommended size 268 x 280</small>
                    <ImageUpload
                        onChange={handleCategoryImageChange}
                        initialImage={null}
                        onRemove={() => setCategoryImage(null)}
                        cropWidth={268}
                        cropHeight={280}
                    />
                </div>

                <h2 className="text-2xl text-white mb-4">Gallery Images</h2>
                <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {newImages.map((image, index) => (
                        <div
                            key={`${image.preview}-${index}`}
                            className="relative w-full h-80 bg-[#1e242b] rounded overflow-hidden flex items-center justify-center shadow"
                        >
                            <img
                                src={image.preview}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                            <textarea
                                value={descriptions[index] || ''}
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
