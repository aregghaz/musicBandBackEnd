import { useForm, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ImageUpload from '@/Components/ImageUpload';
import { useState } from 'react';

export default function Edit() {
    const { bandMember } = usePage().props;

    const { data, setData, errors } = useForm({
        first_name: bandMember.first_name,
        last_name: bandMember.last_name,
        role: bandMember.role,
        band_member_image: null,
        image_remove: false,
    });

    const [existingImage, setExistingImage] = useState(bandMember.band_member_image);

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PATCH');
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);
        formData.append('role', data.role);

        if (data.band_member_image) {
            formData.append('band_member_image', data.band_member_image);
        }

        if (data.image_remove) {
            formData.append('image_remove', '1');
        }

        router.post(`/admin/band-members/${bandMember.id}`, formData, {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Band Member
                </h2>
            }
        >
            <div className="p-6 bg-[#1e242b]">
                <h1 className="text-2xl font-bold mb-4 text-white">Edit Band Member</h1>

                <div className="bg-[#1e242b] shadow-md rounded-lg p-6">
                    <form onSubmit={submit} className="space-y-6">
                        {/* First Name */}
                        <div>
                            <label className="block text-white font-medium mb-2">First Name</label>
                            <input
                                type="text"
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                                className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2"
                                placeholder="Enter First Name"
                            />
                            {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block text-white font-medium mb-2">Last Name</label>
                            <input
                                type="text"
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2"
                                placeholder="Enter Last Name"
                            />
                            {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-white font-medium mb-2">Role</label>
                            <input
                                type="text"
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2"
                                placeholder="Enter Role (e.g. Guitarist, Drummer)"
                            />
                            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-white font-medium mb-2">Band Member Image</label>
                            <ImageUpload
                                initialImage={existingImage}
                                onChange={(file) => {
                                    setData('band_member_image', file);
                                    if (file) {
                                        setExistingImage(null);
                                        setData('image_remove', false);
                                    }
                                }}
                                onRemove={() => {
                                    setExistingImage(null);
                                    setData('band_member_image', null);
                                    setData('image_remove', true);
                                }}
                            />
                            {errors.band_member_image && (
                                <p className="text-red-500 text-sm mt-1">{errors.band_member_image}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-white rounded-md bg-[#ff5252] hover:bg-[#ff6161] transition duration-300"
                            >
                                Update Band Member
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
