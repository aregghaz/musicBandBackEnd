import {usePage, Link, router} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function Index() {
    const {concerts} = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Are you sure?")) {
            router.delete(`/admin/concerts/${id}`);
        }
    };

    return (
        <AuthenticatedLayout
        >
            <div className="p-6 bg-[#1e242b] min-h-screen">
                <h1 className="text-3xl font-semibold mb-6 text-white">Concerts</h1>

                <div className="mb-6 flex justify-between items-center">
                    <Link
                        href={route("concerts.create")}
                        className="bg-[#ff5252] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#ff6161] transition duration-300"
                    >
                        Create Concert
                    </Link>
                </div>

                <div className="overflow-x-auto bg-[#232a32] shadow-lg rounded-lg">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#232a32] text-white">
                        <tr>
                            <th className="px-4 py-3 border-b">City</th>
                            <th className="px-4 py-3 border-b">Place</th>
                            <th className="px-4 py-3 border-b">Date</th>
                            <th className="px-4 py-3 border-b">Type</th>
                            <th className="px-4 py-3 border-b">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {concerts.map((concert) => (
                            <tr key={concert.id} className="hover:bg-[#2b343e] transition-colors">
                                <td className="px-4 py-3 border-b text-white">{concert.concert_city}</td>
                                <td className="px-4 py-3 border-b text-white">{concert.concert_place}</td>
                                <td className="px-4 py-3 border-b text-white">{concert.concert_date}</td>
                                <td className="px-4 py-3 border-b text-white">{concert.type}</td>
                                <td className="px-4 py-3 border-b flex space-x-4">
                                    <Link href={route("concerts.edit", concert.id)}>
                                        <PrimaryButton variant="danger" className="p-0 bg-indigo-600">
                                            Edit
                                        </PrimaryButton>
                                    </Link>
                                    <PrimaryButton
                                        variant="danger"
                                        onClick={() => handleDelete(concert.id)}
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
