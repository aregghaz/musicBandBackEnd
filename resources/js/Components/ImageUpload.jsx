import { useState, useEffect, useCallback, useRef, memo } from "react";
import Cropper from "react-easy-crop";

// Utility to validate image file
const isValidImage = (file) => {
    return file && file.type.startsWith("image/");
};

const ImageUpload = ({ onChange, onRemove, initialImage = null, cropWidth, cropHeight }) => {
    const [preview, setPreview] = useState(initialImage);
    const [fileToCrop, setFileToCrop] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    // Calculate initial zoom to fit image
    const calculateInitialZoom = useCallback(
        (image) => {
            if (!image.width || !image.height) return 1;
            const aspect = cropWidth / cropHeight;
            const imageAspect = image.width / image.height;
            // Fit image to cover crop area
            return imageAspect > aspect
                ? cropHeight / image.height
                : cropWidth / image.width;
        },
        [cropWidth, cropHeight]
    );

    // Handle file selection
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            setError("No file selected.");
            return;
        }

        if (!isValidImage(file)) {
            setError("Please select a valid image file (e.g., JPEG, PNG).");
            return;
        }

        setError(null);
        if (fileToCrop) {
            URL.revokeObjectURL(fileToCrop);
        }
        const fileUrl = URL.createObjectURL(file);
        setFileToCrop(fileUrl);

        // Load image for initial zoom
        try {
            const image = new Image();
            image.src = fileUrl;
            await new Promise((resolve, reject) => {
                image.onload = resolve;
                image.onerror = () => reject(new Error("Failed to load image."));
            });
            const initialZoom = calculateInitialZoom(image);
            setZoom(Math.max(0.5, Math.min(initialZoom, 3)));
            setCrop({ x: 0, y: 0 });
        } catch (err) {
            setError("Failed to process image. Please try another.");
            console.error("Image load error:", err);
        }
    };

    // Damped crop change for slower panning
    const handleCropChange = useCallback((newCrop) => {
        setCrop((prev) => ({
            x: prev.x + (newCrop.x - prev.x) * 0.4, // Damping factor: 0.4
            y: prev.y + (newCrop.y - prev.y) * 0.4,
        }));
    }, []);

    // Handle zoom change with throttling
    const handleZoomChange = useCallback((newZoom) => {
        setZoom(Math.max(0.5, Math.min(newZoom, 3)));
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
            await new Promise((resolve, reject) => {
                image.onload = resolve;
                image.onerror = () => reject(new Error("Failed to load image for cropping."));
            });

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

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

            return new Promise((resolve, reject) => {
                canvas.toBlob(
                    (blob) => {
                        if (!blob) {
                            reject(new Error("Failed to create cropped image."));
                            return;
                        }
                        const file = new File([blob], "cropped-image.jpg", { type: "image/jpeg" });
                        resolve(file);
                    },
                    "image/jpeg",
                    0.9
                );
            });
        },
        [cropWidth, cropHeight]
    );

    // Handle crop confirmation
    const handleCropConfirm = useCallback(async () => {
        if (!fileToCrop || !croppedAreaPixels) {
            setError("No image or crop area selected.");
            return;
        }

        try {
            const croppedFile = await getCroppedImg(fileToCrop, croppedAreaPixels);
            const previewUrl = URL.createObjectURL(croppedFile);
            setPreview(previewUrl);
            onChange(croppedFile);
            setFileToCrop(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch (e) {
            setError("Failed to crop image. Please try again.");
            console.error("Crop error:", e);
        }
    }, [fileToCrop, croppedAreaPixels, onChange, getCroppedImg]);

    // Handle crop cancel
    const handleCropCancel = () => {
        if (fileToCrop) {
            URL.revokeObjectURL(fileToCrop);
        }
        setFileToCrop(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // Handle image removal
    const handleRemoveImage = () => {
        if (preview && !preview.startsWith("http")) {
            URL.revokeObjectURL(preview);
        }
        setPreview(null);
        setFileToCrop(null);
        setError(null);
        onChange(null);
        if (onRemove) onRemove();
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // Clean up Blob URLs on unmount
    useEffect(() => {
        return () => {
            if (preview && !preview.startsWith("http")) {
                URL.revokeObjectURL(preview);
            }
            if (fileToCrop) {
                URL.revokeObjectURL(fileToCrop);
            }
        };
    }, [preview, fileToCrop]);

    // Update preview when initialImage changes
    useEffect(() => {
        setPreview(initialImage);
    }, [initialImage]);

    return (
        <div className="space-y-3 w-56" aria-label="Image upload and crop">
            {error && <div className="text-red-500 text-sm">{error}</div>}

            {preview && (
                <div className="relative h-40 rounded-lg overflow-hidden shadow-md bg-[#232a32]">
                    <img
                        src={preview}
                        alt="Image preview"
                        className="object-cover w-full h-full"
                    />
                    <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                        aria-label="Remove image"
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
            )}

            <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                disabled={preview || fileToCrop}
                onChange={handleFileChange}
                ref={fileInputRef}
                className="block w-full text-sm text-gray-300 border border-[#232a32] rounded-md cursor-pointer bg-[#1e242b] focus:outline-none focus:ring-2 focus:ring-[#ff5252]"
                aria-label="Upload image"
            />

            {fileToCrop && (
                <div className="space-y-4">
                    <div className="relative h-64 bg-[#232a32] rounded-lg overflow-hidden">
                        <Cropper
                            image={fileToCrop}
                            crop={crop}
                            zoom={zoom}
                            zoomSpeed={0.2} // Very slow zoom
                            minZoom={0.5}
                            maxZoom={3}
                            restrictPosition={false}
                            aspect={cropWidth / cropHeight}
                            onCropChange={handleCropChange}
                            onZoomChange={handleZoomChange}
                            onCropComplete={onCropComplete}
                            aria-label="Crop image"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={handleCropCancel}
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                            aria-label="Cancel crop"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleCropConfirm}
                            className="px-4 py-2 bg-[#ff5252] text-white rounded-md hover:bg-[#ff6161]"
                            aria-label="Confirm crop"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default memo(ImageUpload);
