import { usePage, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

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
            <div className="p-6 bg-[#1e242b] min-h-screen">
                <h1 className="text-2xl font-bold mb-4 text-white">Band Members</h1>

                <div className="mb-6 flex justify-between items-center">
                    <Link
                        href={route("band-members.create")}
                        className="bg-[#ff5252] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#ff6161] transition duration-300"
                    >
                        + Add Band Member
                    </Link>
                </div>

                <div className="overflow-x-auto bg-[#232a32] shadow-lg rounded-lg">
                    <table className="w-full text-left border-collapse">
                        <thead className="text-white bg-[#232a32]">
                        <tr>
                            <th className="px-4 py-3 border-b">First Name</th>
                            <th className="px-4 py-3 border-b">Last Name</th>
                            <th className="px-4 py-3 border-b">Role</th>
                            <th className="px-4 py-3 border-b">Country</th>
                            <th className="px-4 py-3 border-b">Image</th>
                            <th className="px-4 py-3 border-b">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="text-white">
                        {bandMembers.map((bandMember) => (
                            <tr key={bandMember.id} className="hover:bg-[#2a2f37] transition-colors">
                                <td className="px-4 py-3 border-b">{bandMember.first_name}</td>
                                <td className="px-4 py-3 border-b">{bandMember.last_name}</td>
                                <td className="px-4 py-3 border-b">{bandMember.role}</td>
                                <td className="px-4 py-3 border-b">{bandMember.country}</td>
                                <td className="px-4 py-3 border-b">
                                    {bandMember.band_member_image ? (
                                        <img
                                            src={bandMember.band_member_image}
                                            alt={bandMember.first_name}
                                            className="w-12 h-12 rounded-full border shadow-sm object-cover"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 flex items-center justify-center bg-gray-700 rounded-full text-white text-sm">
                                            N/A
                                        </div>
                                    )}
                                </td>
                                <td className="px-4 py-3 border-b flex space-x-4">
                                    <Link href={route("band-members.edit", bandMember.id)}>
                                        <PrimaryButton variant="danger" className="p-0 bg-indigo-600">
                                            Edit
                                        </PrimaryButton>
                                    </Link>
                                    <PrimaryButton
                                        variant="danger"
                                        onClick={() => handleDelete(bandMember.id)}
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
