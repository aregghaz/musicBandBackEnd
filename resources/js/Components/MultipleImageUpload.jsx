import { useState, useEffect, useRef, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import 'react-easy-crop/react-easy-crop.css';

export default function MultipleImageUpload({ onChange, initialImages = [], cropWidth, cropHeight }) {
    const [images, setImages] = useState(initialImages);
    const [fileToCrop, setFileToCrop] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [aspectRatio, setAspectRatio] = useState(cropWidth && cropHeight ? cropWidth / cropHeight : 1);
    const isMounted = useRef(false);
    const prevImagesRef = useRef(initialImages);
    const fileInputRef = useRef(null);

    // Check if cropping is enabled
    const isCropMode = cropWidth && cropHeight;

    // Initialize images from initialImages only on mount
    useEffect(() => {
        if (!isMounted.current) {
            console.log('Initial images received:', initialImages);
            setImages(initialImages);
            prevImagesRef.current = initialImages;
            isMounted.current = true;
        } else if (initialImages.length === 0) {
            setImages([]);
            prevImagesRef.current = [];
        }
    }, [initialImages]);

    // Notify parent only when images change
    useEffect(() => {
        const imagesChanged = JSON.stringify(images) !== JSON.stringify(prevImagesRef.current);
        if (imagesChanged) {
            console.log('Images state updated:', images);
            onChange(images.map((img) => img.file || img.preview));
            prevImagesRef.current = images;
        }
    }, [images, onChange]);

    // Handle file selection
    const handleFileChange = useCallback(
        (e) => {
            const selectedFiles = Array.from(e.target.files);
            if (isCropMode && selectedFiles.length > 0) {
                const file = selectedFiles[0];
                if (fileToCrop) {
                    URL.revokeObjectURL(fileToCrop);
                }
                const previewUrl = URL.createObjectURL(file);
                setFileToCrop(previewUrl);
                setAspectRatio(3 / 4);
                setCrop({ x: 0, y: 0 });
                setZoom(1);
                setCroppedAreaPixels(null);
            } else {
                const newImages = selectedFiles.map((file) => ({
                    file,
                    preview: URL.createObjectURL(file),
                }));
                const updatedImages = [...images, ...newImages];
                console.log('Adding images:', newImages);
                setImages(updatedImages);
            }
        },
        [fileToCrop, images, isCropMode, cropWidth, cropHeight]
    );

    // Toggle aspect ratio
    const toggleAspectRatio = useCallback((mode) => {
        if (mode === 'landscape') {
            setAspectRatio(4 / 3); // Landscape: 4:3
        } else {
            setAspectRatio(3 / 4); // Portrait: 3:4
        }
        setCrop({ x: 0, y: 0 }); // Reset crop position
    }, []);

    // Handle crop completion
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    // Generate cropped image
    const getCroppedImg = useCallback(
        async (imageSrc, pixelCrop) => {
            const image = new Image();
            image.src = imageSrc;
            await new Promise((resolve) => (image.onload = resolve));

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = cropWidth;
            canvas.height = cropHeight;

            ctx.drawImage(
                image,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                cropWidth,
                cropHeight
            );

            return new Promise((resolve) => {
                canvas.toBlob((blob) => {
                    const file = new File([blob], `cropped-image-${Date.now()}.jpg`, { type: 'image/jpeg' });
                    resolve(file);
                }, 'image/jpeg');
            });
        },
        [cropWidth, cropHeight]
    );

    // Handle crop confirmation
    const handleCropConfirm = useCallback(async () => {
        try {
            const croppedFile = await getCroppedImg(fileToCrop, croppedAreaPixels);
            const newImage = {
                file: croppedFile,
                preview: URL.createObjectURL(croppedFile),
            };
            const updatedImages = [...images, newImage];
            setImages(updatedImages);
            setFileToCrop(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (e) {
            console.error('Error cropping image:', e);
        }
    }, [fileToCrop, croppedAreaPixels, images, getCroppedImg]);

    // Handle crop cancel
    const handleCropCancel = useCallback(() => {
        if (fileToCrop) {
            URL.revokeObjectURL(fileToCrop);
        }
        setFileToCrop(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, [fileToCrop]);

    // Handle removing an image
    const handleRemoveImage = useCallback(
        (indexToRemove) => {
            console.log('Removing image at index:', indexToRemove);
            const updatedImages = images.filter((_, index) => index !== indexToRemove);
            setImages(updatedImages);
            console.log('Updated images:', updatedImages);

            const imageToRemove = images[indexToRemove];
            if (imageToRemove.file) {
                URL.revokeObjectURL(imageToRemove.preview);
            }

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        },
        [images]
    );

    // Clean up object URLs on component unmount
    useEffect(() => {
        return () => {
            images.forEach((img) => {
                if (img.file) {
                    URL.revokeObjectURL(img.preview);
                }
            });
            if (fileToCrop) {
                URL.revokeObjectURL(fileToCrop);
            }
        };
    }, [images, fileToCrop]);

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap gap-4">
                {images.map((img, index) => (
                    <div
                        key={`${img.preview}-${index}`}
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
                multiple={!isCropMode}
                disabled={fileToCrop !== null}
                onChange={handleFileChange}
                ref={fileInputRef}
                className="block w-56 text-sm text-gray-300 border border-[#232a32] rounded-md cursor-pointer bg-[#1e242b] focus:outline-none focus:ring-2"
            />

            {fileToCrop && isCropMode && (
                <div className="space-y-4 w-56">
                    <div className="relative h-64 bg-[#232a32] rounded-lg overflow-hidden">
                        <Cropper
                            image={fileToCrop}
                            crop={crop}
                            zoom={zoom}
                            minZoom={0.5}
                            restrictPosition={false}
                            aspect={aspectRatio}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                    </div>
                    <div className="flex justify-between space-x-2">
                        <div className="flex space-x-2">
                            <button
                                type="button"
                                onClick={() => toggleAspectRatio('landscape')}
                                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Landscape
                            </button>
                            <button
                                type="button"
                                onClick={() => toggleAspectRatio('portrait')}
                                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Portrait
                            </button>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                type="button"
                                onClick={handleCropCancel}
                                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleCropConfirm}
                                className="px-4 py-2 bg-[#ff5252] text-white rounded-md hover:bg-[#ff6161]"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
