import { usePage, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

export default function Index() {
    const { bandMembers } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Are you sure?")) {
            router.delete(`/admin/band-members/${id}`);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Band Members
                </h2>
            }
        >
            <div className="p-8 bg-gray-50 min-h-screen">
                <h1 className="text-3xl font-semibold mb-6 text-gray-800">Band Members</h1>

                <div className="mb-6 flex justify-between items-center">
                    <Link
                        href={route("band-members.create")}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        + Add Band Member
                    </Link>
                </div>

                <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-blue-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-3 border-b">First Name</th>
                            <th className="px-4 py-3 border-b">Last Name</th>
                            <th className="px-4 py-3 border-b">Role</th>
                            <th className="px-4 py-3 border-b">Image</th>
                            <th className="px-4 py-3 border-b">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bandMembers.map((bandMember) => (
                            <tr key={bandMember.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 border-b">{bandMember.first_name}</td>
                                <td className="px-4 py-3 border-b">{bandMember.last_name}</td>
                                <td className="px-4 py-3 border-b">{bandMember.role}</td>
                                <td className="px-4 py-3 border-b">
                                    <img
                                        src={bandMember.band_member_image}
                                        alt={bandMember.first_name}
                                        className="w-12 h-12 rounded-full border shadow-sm"
                                    />
                                </td>
                                <td className="px-4 py-3 border-b">
                                    <Link
                                        href={route("band-members.edit", bandMember.id)}
                                        className="text-blue-600 hover:text-blue-800 transition duration-300"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(bandMember.id)}
                                        className="text-red-600 hover:text-red-800 transition duration-300 ml-3"
                                    >
                                        Delete
                                    </button>
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
