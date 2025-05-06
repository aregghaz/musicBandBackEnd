import { useState, useEffect, useCallback } from "react";
import Cropper from "react-easy-crop";

export default function ImageUpload({ onChange, onRemove, initialImage = null, cropWidth, cropHeight }) {
    const [preview, setPreview] = useState(initialImage);
    const [fileToCrop, setFileToCrop] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    // Handle file selection and show cropper
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileToCrop(URL.createObjectURL(file));
        }
    };

    // Handle crop completion
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    // Generate cropped image
    const getCroppedImg = useCallback(async (imageSrc, pixelCrop) => {
        const image = new Image();
        image.src = imageSrc;
        await new Promise((resolve) => (image.onload = resolve));

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

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                const file = new File([blob], "cropped-image.jpg", { type: "image/jpeg" });
                resolve(file);
            }, "image/jpeg");
        });
    }, [cropWidth, cropHeight]);

    // Handle crop confirmation
    const handleCropConfirm = useCallback(async () => {
        try {
            const croppedFile = await getCroppedImg(fileToCrop, croppedAreaPixels);
            setPreview(URL.createObjectURL(croppedFile));
            onChange(croppedFile);
            setFileToCrop(null);
        } catch (e) {
            console.error("Error cropping image:", e);
        }
    }, [fileToCrop, croppedAreaPixels, onChange, getCroppedImg]);

    // Handle crop cancel
    const handleCropCancel = () => {
        setFileToCrop(null);
    };

    // Handle image removal
    const handleRemoveImage = () => {
        setPreview(null);
        onChange(null);
        if (onRemove) onRemove();
    };

    // Update preview when initialImage changes
    useEffect(() => {
        setPreview(initialImage);
    }, [initialImage]);

    return (
        <div className="space-y-3 w-56">
            {preview && (
                <div className="relative h-40 rounded-lg overflow-hidden shadow-md bg-[#232a32]">
                    <img
                        src={preview}
                        alt="Preview"
                        className="object-cover w-full h-full"
                    />
                    <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
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
                accept="image/*"
                disabled={preview || fileToCrop}
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-300 border border-[#232a32] rounded-md cursor-pointer bg-[#1e242b] focus:outline-none focus:ring-2"
            />

            {fileToCrop && (
                <div className="space-y-4">
                    <div className="relative h-64 bg-[#232a32] rounded-lg overflow-hidden">
                        <Cropper
                            image={fileToCrop}
                            crop={crop}
                            zoom={zoom}
                            minZoom={0.5}
                            restrictPosition={false}
                            aspect={cropWidth / cropHeight}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
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
            )}
        </div>
    );
}
