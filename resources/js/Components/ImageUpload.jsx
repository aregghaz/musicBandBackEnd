import { useState, useEffect } from "react";

export default function ImageUpload({ onChange, onRemove, initialImage = null }) {
    const [preview, setPreview] = useState(initialImage);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            onChange(file);
        }
    };

    const handleRemoveImage = () => {
        setPreview(null);
        onChange(null);
        if (onRemove) onRemove();  // trigger the onRemove callback if provided
    };

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
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            )}

            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-300 border border-[#232a32] rounded-md cursor-pointer bg-[#1e242b] focus:outline-none focus:ring-2"
            />
        </div>
    );
}
