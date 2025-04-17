import { usePage, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function SliderIndex() {
    const { sliders } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Are you sure?")) {
            router.delete(`/admin/sliders/${id}`);
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-[#1e242b] min-h-screen">
                <h1 className="text-3xl font-semibold mb-6 text-white">Sliders</h1>

                <div className="mb-6 flex justify-between items-center">
                    <Link
                        href={route("sliders.create")}
                        className="bg-[#ff5252] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#ff6161] transition duration-300"
                    >
                        + Add Slider
                    </Link>
                </div>

                <div className="overflow-x-auto bg-[#232a32] shadow-lg rounded-lg">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#232a32] text-white">
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
                            <tr key={slider.id} className="hover:bg-[#2a333e] transition-colors">
                                <td className="px-4 py-3 border-b text-white">{slider.slider_title}</td>
                                <td className="px-4 py-3 border-b text-white">{slider.slider_short_description}</td>
                                <td className="px-4 py-3 border-b">
                                    <a
                                        href={slider.slider_video_link}
                                        className="text-[#ff5252] hover:text-[#ff6161] transition duration-300"
                                    >
                                        {slider.slider_video_link}
                                    </a>
                                </td>
                                <td className="px-4 py-3 border-b">
                                    {slider.slider_image ? (
                                        <img
                                            src={`${slider.slider_image}`}
                                            alt={slider.slider_title}
                                            className="w-12 h-12 rounded-full border shadow-sm"
                                        />
                                    ) : (
                                        <span className="text-gray-400">No Image</span>
                                    )}
                                </td>


                                <td className="px-4 py-3 border-b flex space-x-4">


                                    <Link href={route("sliders.edit", slider.id)}>
                                        <PrimaryButton variant="danger" className="p-0 bg-indigo-600 hover:bg-indigo-500 !focus:bg-indigo-600">
                                            Edit
                                        </PrimaryButton>
                                    </Link>
                                    <PrimaryButton
                                        variant="danger"
                                        onClick={() => handleDelete(slider.id)}
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
