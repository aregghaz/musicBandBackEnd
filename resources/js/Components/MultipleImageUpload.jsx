import { useState, useEffect, useRef } from 'react';

export default function MultipleImageUpload({ onChange, initialImages = [] }) {
    const [images, setImages] = useState(initialImages);
    const isMounted = useRef(false);

    // Initialize images from initialImages only on mount
    useEffect(() => {
        if (!isMounted.current) {
            console.log('Initial images received:', initialImages);
            setImages(initialImages);
            isMounted.current = true;
        }
    }, [initialImages]);

    // Log images state changes for debugging
    useEffect(() => {
        console.log('Images state updated:', images);
    }, [images]);

    // Handle adding new images
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const newImages = selectedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        const updatedImages = [...images, ...newImages];
        console.log('Adding images:', newImages);
        setImages(updatedImages);
        onChange(updatedImages.map((img) => img.file || img.preview));
    };

    // Handle removing an image
    const handleRemoveImage = (indexToRemove) => {
        console.log('Removing image at index:', indexToRemove);
        const updatedImages = images.filter((_, index) => index !== indexToRemove);
        setImages(updatedImages);
        console.log('Updated images:', updatedImages);
        onChange(updatedImages.map((img) => img.file || img.preview));

        // Clean up object URL for new File objects
        const imageToRemove = images[indexToRemove];
        if (imageToRemove.file) {
            URL.revokeObjectURL(imageToRemove.preview);
        }
    };

    // Clean up object URLs on component unmount
    useEffect(() => {
        return () => {
            images.forEach((img) => {
                if (img.file) {
                    URL.revokeObjectURL(img.preview);
                }
            });
        };
    }, [images]);

    return (
        <div className="space-y-3 ">
            <div className="flex flex-wrap gap-4">
                {images.map((img, index) => (
                    <div
                        key={`${img.preview}-${index}`} // Unique key
                        className="relative w-40 h-40 rounded-lg overflow-hidden shadow-md bg-[#232a32]"
                    >
                        <img
                            src={img.preview}
                            alt={`Preview ${index}`}
                            className="object-cover w-full h-full"
                        />
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log('Delete button clicked for index:', index);
                                handleRemoveImage(index);
                            }}
                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 z-10"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="block w-56 text-sm text-gray-300 border border-[#232a32] rounded-md cursor-pointer bg-[#1e242b] focus:outline-none focus:ring-2"
            />
        </div>
    );
}
