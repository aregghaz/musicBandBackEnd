import { usePage, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import PrimaryButton from '@/Components/PrimaryButton.jsx';

export default function GalleryIndex() {
    const { categories } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this category and all its images?')) {
            router.delete(route('gallery.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
        >
            <div className="p-6 bg-[#1e242b] min-h-screen">
                <h1 className="text-2xl font-bold mb-4 text-white">Gallery Folders</h1>

                <div className="mb-6 flex justify-between items-center">
                    <Link
                        href={route('gallery.create')}
                        className="bg-[#ff5252] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#ff6161] transition duration-300"
                    >
                        + Add Gallery Folder
                    </Link>
                </div>

                <div className="overflow-x-auto bg-[#232a32] shadow-lg rounded-lg">
                    <table className="w-full text-left border-collapse">
                        <thead className="text-white bg-[#232a32]">
                        <tr>
                            <th className="px-4 py-3 border-b">Folder Name</th>
                            <th className="px-4 py-3 border-b">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="text-white">
                        {categories.map((category) => (
                            <tr
                                key={category.id}
                                className="hover:bg-[#2a2f37] transition-colors"
                            >
                                <td className="px-4 py-3 border-b">{category.folder_name}</td>
                                <td className="px-4 py-3 border-b flex space-x-4">
                                    <Link href={route('gallery.edit', category.id)}>
                                        <PrimaryButton
                                            variant="danger"
                                            className="p-0 bg-indigo-600"
                                        >
                                            Edit
                                        </PrimaryButton>
                                    </Link>
                                    <PrimaryButton
                                        variant="danger"
                                        onClick={() => handleDelete(category.id)}
                                        className="p-0 !bg-[#ff5252]"
                                    >
                                        Delete
                                    </PrimaryButton>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
