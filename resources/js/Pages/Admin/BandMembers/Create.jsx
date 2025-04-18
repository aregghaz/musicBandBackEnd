import ImageUpload from '@/Components/ImageUpload';
import {useForm} from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create() {
    const {data, setData, post, processing, errors} = useForm({
        first_name: '',
        last_name: '',
        role: '',
        band_member_image: null, // make this null, it'll hold the File object
    });

    function submit(e) {
        e.preventDefault();

        post(route('band-members.store'), {
            forceFormData: true
        });
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Band Member
                </h2>
            }
        >
            <div className="p-6 bg-[#1e242b]">
                <h1 className="text-2xl font-bold mb-4 text-white">Create Band Member</h1>
                <form onSubmit={submit}>
                    {/* Name, Last Name, Role inputs */}
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.first_name}
                            onChange={e => setData('first_name', e.target.value)}
                            placeholder="First Name"
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400"
                        />
                        {errors.first_name && <div className="text-red-500">{errors.first_name}</div>}
                    </div>

                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.last_name}
                            onChange={e => setData('last_name', e.target.value)}
                            placeholder="Last Name"
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400"
                        />
                        {errors.last_name && <div className="text-red-500">{errors.last_name}</div>}
                    </div>

                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.role}
                            onChange={e => setData('role', e.target.value)}
                            placeholder="Role"
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400"
                        />
                        {errors.role && <div className="text-red-500">{errors.role}</div>}
                    </div>

                    {/* Image Upload */}
                    <div className="mb-4">
                        <ImageUpload
                            onChange={file => setData('band_member_image', file)}
                            initialImage={null}
                        />
                        {errors.band_member_image && (
                            <div className="text-red-500">{errors.band_member_image}</div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full px-4 py-2 bg-[#ff5252] text-white rounded-md hover:bg-[#ff6161] disabled:opacity-50"
                    >
                        {processing ? 'Creating...' : 'Create Band Member'}
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
