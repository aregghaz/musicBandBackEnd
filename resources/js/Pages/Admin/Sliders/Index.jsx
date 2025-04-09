import { usePage, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

export default function SliderIndex() {
    const { sliders } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Are you sure?")) {
            router.delete(`/admin/sliders/${id}`);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Sliders
                </h2>
            }
        >
            <div className="p-8 bg-gray-50 min-h-screen">
                <h1 className="text-3xl font-semibold mb-6 text-gray-800">Sliders</h1>

                <div className="mb-6 flex justify-between items-center">
                    <Link
                        href={route("sliders.create")}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        + Add Slider
                    </Link>
                </div>

                <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-blue-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-3 border-b">Title</th>
                            <th className="px-4 py-3 border-b">Short Description</th>
                            <th className="px-4 py-3 border-b">Video Link</th>
                            <th className="px-4 py-3 border-b">Image</th>
                            <th className="px-4 py-3 border-b">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sliders.map((slider) => (
                            <tr key={slider.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 border-b">{slider.slider_title}</td>
                                <td className="px-4 py-3 border-b">{slider.slider_short_description}</td>
                                <td className="px-4 py-3 border-b">
                                    <a
                                        href={slider.slider_video_link}
                                        className="text-blue-600 hover:text-blue-800 transition duration-300"
                                    >
                                        {slider.slider_video_link}
                                    </a>
                                </td>
                                <td className="px-4 py-3 border-b">
                                    {slider.slider_image ? (
                                        <img
                                            src={`/storage/${slider.slider_image}`} // Adjust path as necessary
                                            alt={slider.slider_title}
                                            className="w-12 h-12 rounded-full border shadow-sm"
                                        />
                                    ) : (
                                        <span className="text-gray-400">No Image</span>
                                    )}
                                </td>
                                <td className="px-4 py-3 border-b">
                                    <div className="flex space-x-3">
                                        <Link
                                            href={route("sliders.edit", slider.id)}
                                            className="text-blue-600 hover:text-blue-800 transition duration-300"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(slider.id)}
                                            className="text-red-600 hover:text-red-800 transition duration-300"
                                        >
                                            Delete
                                        </button>
                                    </div>
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
