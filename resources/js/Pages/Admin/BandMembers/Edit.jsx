import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ bandMember }) {
    const { data, setData, patch, processing, errors } = useForm({
        first_name: bandMember.first_name,
        last_name: bandMember.last_name,
        role: bandMember.role,
        band_member_image: bandMember.band_member_image,
    });

    function submit(e) {
        e.preventDefault();
        patch(route('band-members.update', bandMember.id));
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Band Member
                </h2>
            }
        >
            <div className="p-8 bg-gray-50 min-h-screen">
                <h1 className="text-3xl font-semibold mb-6 text-gray-800">Edit Band Member</h1>

                <div className="bg-white shadow-md rounded-lg p-6">
                    <form onSubmit={submit} className="space-y-6">
                        {/* First Name */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">First Name</label>
                            <input
                                type="text"
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                                placeholder="Enter First Name"
                            />
                            {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Last Name</label>
                            <input
                                type="text"
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                                placeholder="Enter Last Name"
                            />
                            {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Role</label>
                            <input
                                type="text"
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                                placeholder="Enter Role (e.g. Guitarist, Drummer)"
                            />
                            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                        </div>

                        {/* Band Member Image */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Image URL</label>
                            <input
                                type="text"
                                value={data.band_member_image}
                                onChange={(e) => setData('band_member_image', e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                                placeholder="Enter Image URL"
                            />
                            {errors.band_member_image && <p className="text-red-500 text-sm mt-1">{errors.band_member_image}</p>}
                        </div>



                        {/* Submit Button */}
                        <div className="mt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className={`px-6 py-2 text-white font-medium rounded-lg shadow-md ${
                                    processing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 transition duration-300'
                                }`}
                            >
                                {processing ? 'Updating...' : 'Update Band Member'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
