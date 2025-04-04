import {useForm} from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create() {
    const {data, setData, post, processing, errors} = useForm({
        first_name: '',
        last_name: '',
        role: '',
        band_member_image: 'https://via.placeholder.com/150',
    });

    function submit(e) {
        e.preventDefault();
        post(route('band-members.store'));
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Band Member
                </h2>
            }
        >
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Create Band Member</h1>
                <form onSubmit={submit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.first_name}
                            onChange={e => setData('first_name', e.target.value)}
                            placeholder="First Name"
                            className="border p-2 w-full"
                        />
                        {errors.first_name && <div className="text-red-500">{errors.first_name}</div>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.last_name}
                            onChange={e => setData('last_name', e.target.value)}
                            placeholder="Last Name"
                            className="border p-2 w-full"
                        />
                        {errors.last_name && <div className="text-red-500">{errors.last_name}</div>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.role}
                            onChange={e => setData('role', e.target.value)}
                            placeholder="Role"
                            className="border p-2 w-full"
                        />
                        {errors.role && <div className="text-red-500">{errors.role}</div>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.band_member_image}
                            placeholder="Image URL"
                            className="border p-2 w-full"
                        />
                        {errors.band_member_image && <div className="text-red-500">{errors.image}</div>}
                    </div>
                    <button type="submit" disabled={processing} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Create
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
