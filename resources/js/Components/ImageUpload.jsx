import { useState, useEffect, useCallback, useRef, memo } from "react";
import Cropper from "react-easy-crop";

// Utility to validate image file
const isValidImage = (file) => {
    return file && (file.type.startsWith("image/") || file.type === "image/x-icon");
};

const ImageUpload = ({ onChange, onRemove, initialImage = null, cropWidth, cropHeight }) => {
    const [preview, setPreview] = useState(initialImage);
    const [fileToCrop, setFileToCrop] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [error, setError] = useState(null);
    const [cropMode, setCropMode] = useState("landscape");
    const [selectedFile, setSelectedFile] = useState(null); // Store original file for .ico
    const fileInputRef = useRef(null);

    const isCropMode = cropWidth && cropHeight;
    const isIcoFile = selectedFile && selectedFile.type === "image/x-icon"; // Use file type for accuracy
    const aspectRatio = isCropMode && !isIcoFile
        ? cropMode === "landscape" ? 4 / 3 : 3 / 4
        : 1; // Square for favicons

    // Calculate initial zoom to fit image
    const calculateInitialZoom = useCallback(
        (image) => {
            if (!image.width || !image.height) return 1;
            const imageAspect = image.width / image.height;
            return imageAspect > aspectRatio
                ? cropHeight / image.height
                : cropWidth / image.width;
        },
        [cropWidth, cropHeight, aspectRatio]
    );

    // Handle file selection
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            setError("No file selected.");
            return;
        }

        if (!isValidImage(file)) {
            setError("Please select a valid image file (e.g., JPEG, PNG, WebP, ICO).");
            return;
        }

        setSelectedFile(file); // Store original file
        setError(null);
        if (fileToCrop) {
            URL.revokeObjectURL(fileToCrop);
        }
        const fileUrl = URL.createObjectURL(file);
        setFileToCrop(fileUrl);

        try {
            const image = new Image();
            image.src = fileUrl;
            await new Promise((resolve, reject) => {
                image.onload = resolve;
                image.onerror = () => reject(new Error("Failed to load image."));
            });
            setZoom(1);
            setCrop({ x: 0, y: 0 });
        } catch (err) {
            setError("Failed to process image. Please try another.");
            console.error("Image load error:", err);
        }
    };

    // Damped crop change for slower panning
    const handleCropChange = useCallback((newCrop) => {
        setCrop((prev) => ({
            x: prev.x + (newCrop.x - prev.x) * 0.4,
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

    // Generate cropped image (for non-.ico files)
    const getCroppedImg = useCallback(
        async (imageSrc, pixelCrop, outputFormat = "image/jpeg", fileName = "cropped-image.jpg") => {
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
                        const file = new File([blob], fileName, { type: outputFormat });
                        resolve(file);
                    },
                    outputFormat,
                    0.9
                );
            });
        },
        [cropWidth, cropHeight]
    );

    // Handle crop confirmation
    const handleCropConfirm = useCallback(async () => {
        if (!fileToCrop) {
            setError("No image selected.");
            return;
        }

        try {
            let fileToSend;
            if (isIcoFile) {
                // Use original .ico file without cropping
                fileToSend = new File([selectedFile], selectedFile.name, { type: "image/x-icon" });
            } else if (croppedAreaPixels) {
                // Crop non-.ico files (JPEG, PNG, WebP)
                const originalExtension = selectedFile.name.split('.').pop().toLowerCase();
                const outputFormat = originalExtension === 'png' ? 'image/png' : 'image/jpeg';
                const fileName = `cropped-image.${originalExtension === 'png' ? 'png' : 'jpg'}`;
                fileToSend = await getCroppedImg(fileToCrop, croppedAreaPixels, outputFormat, fileName);
            } else {
                setError("No crop area selected.");
                return;
            }

            const previewUrl = URL.createObjectURL(fileToSend);
            setPreview(previewUrl);
            onChange(fileToSend);
            setFileToCrop(null);
            setSelectedFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        } catch (e) {
            setError("Failed to process image. Please try again.");
            console.error("Crop error:", e);
        }
    }, [fileToCrop, croppedAreaPixels, onChange, getCroppedImg, isIcoFile, selectedFile]);

    // Handle crop cancel
    const handleCropCancel = () => {
        if (fileToCrop) {
            URL.revokeObjectURL(fileToCrop);
        }
        setFileToCrop(null);
        setSelectedFile(null);
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
        setSelectedFile(null);
        setError(null);
        onChange(null);
        if (onRemove) onRemove();
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // Handle crop mode toggle (disable for .ico)
    const handleCropModeToggle = (mode) => {
        if (!isIcoFile) {
            setCropMode(mode);
            setCrop({ x: 0, y: 0 });
            setZoom(1);
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
                        className="object-contain w-full h-full"
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
                accept="image/jpeg,image/png,image/webp,image/x-icon"
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
                            zoomSpeed={0.2}
                            minZoom={0.5}
                            maxZoom={3}
                            restrictPosition={false}
                            aspect={aspectRatio}
                            onCropChange={handleCropChange}
                            onZoomChange={handleZoomChange}
                            onCropComplete={onCropComplete}
                            aria-label="Crop image"
                            disableAutomaticStylesInjection={isIcoFile}
                        />
                    </div>
                    {!isIcoFile && isCropMode && (
                        <div className="flex space-x-2 mb-2">
                            <button
                                type="button"
                                onClick={() => handleCropModeToggle("landscape")}
                                className={`px-3 py-1 text-sm rounded-md ${
                                    cropMode === "landscape"
                                        ? "bg-[#ff5252] text-white"
                                        : "bg-gray-600 text-gray-200"
                                } hover:bg-[#ff6161]`}
                                aria-label="Switch to landscape crop"
                            >
                                Landscape
                            </button>
                            <button
                                type="button"
                                onClick={() => handleCropModeToggle("portrait")}
                                className={`px-3 py-1 text-sm rounded-md ${
                                    cropMode === "portrait"
                                        ? "bg-[#ff5252] text-white"
                                        : "bg-gray-600 text-gray-200"
                                } hover:bg-[#ff6161]`}
                                aria-label="Switch to portrait crop"
                            >
                                Portrait
                            </button>
                        </div>
                    )}
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
