import {usePage, Link, router} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

export default function Index() {

    const { concerts } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Are you sure?")) {
            router.delete(`/admin/concerts/${id}`);
        }
    };

    return (


    <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Concerts
            </h2>
        }
    >
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-semibold mb-6 text-gray-800">Concerts</h1>

            <div className="mb-6 flex justify-between items-center">
                <Link
                    href={route("concerts.create")}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                >
                    Create Concert
                </Link>
            </div>

            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-blue-100 text-gray-700">
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
                        <tr key={concert.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 border-b">{concert.concert_city}</td>
                            <td className="px-4 py-3 border-b">{concert.concert_place}</td>
                            <td className="px-4 py-3 border-b">{concert.concert_date}</td>
                            <td className="px-4 py-3 border-b">{concert.type}</td>
                            <td className="px-4 py-3 border-b flex space-x-3">
                                <Link
                                    href={route("concerts.edit", concert.id)}
                                    className="text-blue-600 hover:text-blue-800 transition duration-300"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(concert.id)}
                                    className="text-red-600 hover:text-red-800 transition duration-300"
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
