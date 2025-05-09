import {useState, useEffect} from 'react';
import {usePage, router} from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import MultipleImageUpload from "@/Components/MultipleImageUpload.jsx";

export default function GalleryIndex() {
    const {galleries} = usePage().props;
    const [newImages, setNewImages] = useState([]);


    const serverImages = galleries.map(item => ({
        preview: `/storage/${item.gallery_image}`,
        id: item.id
    }));


    const handleImageChange = (files) => {
        const updatedImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        setNewImages(updatedImages);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this image?')) {
            router.delete(route('gallery.destroy', id));
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        console.log('Saving images:', newImages);
        if (newImages.length === 0) {
            alert('No images selected.');
            return;
        }

        const formData = new FormData();
        newImages.forEach(image => formData.append('gallery_images[]', image.file));

        router.post(route('gallery.store'), formData, {
            forceFormData: true,
            onSuccess: () => {
                setNewImages([]);
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
                <h2 className="text-2xl mb-4 text-white">Gallery</h2>

                <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {serverImages.map(item => (
                        <div
                            key={item.id}
                            className="relative w-full h-80 bg-[#222] rounded overflow-hidden flex items-center justify-center shadow"
                        >
                            <img
                                src={item.preview}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    {/*{newImages.map((image, index) => (*/}
                    {/*    <div*/}
                    {/*        key={`${image.preview}-${index}`}*/}
                    {/*        className="relative w-full h-80 bg-[#222] rounded overflow-hidden flex items-center justify-center shadow"*/}
                    {/*    >*/}
                    {/*        <img*/}
                    {/*            src={image.preview}*/}
                    {/*            alt=""*/}
                    {/*            className="w-full h-full object-cover"*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*))}*/}
                </div>

                <div className="flex flex-col gap-4">
                    <MultipleImageUpload
                        initialImages={newImages}

                        onChange={handleImageChange}
                        cropWidth={340}
                        cropHeight={450}
                    />
                    <PrimaryButton
                        variant="danger"
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
