import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

export default function Edit({ concert }) {
    const { data, setData, patch, processing, errors } = useForm({
        concert_city: concert.concert_city,
        concert_place: concert.concert_place,
        concert_date: concert.concert_date,
        type: concert.type, // Ensure the current concert type is selected
        concert_image: concert.concert_image,
    });

    // Define concert types for the dropdown
    const concertTypes = [
        { id: 1, label: 'American', value: 1 },
        { id: 2, label: 'Armenian', value: 2 },
    ];

    // Handle form submission
    function submit(e) {
        e.preventDefault();
        patch(`/admin/concerts/${concert.id}`);
    }

    return (
        <AuthenticatedLayout
        >
            <div className="p-6 bg-[#1e242b] min-h-screen">
                <h1 className="text-2xl font-bold mb-4 text-white">Edit Concert</h1>
                <form onSubmit={submit}>
                    {/* City input */}
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.concert_city}
                            onChange={e => setData("concert_city", e.target.value)}
                            placeholder="City"
                            className="w-full px-4 py-2 border rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2"
                        />
                    </div>

                    {/* Place input */}
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.concert_place}
                            onChange={e => setData("concert_place", e.target.value)}
                            placeholder="Place"
                            className="w-full px-4 py-2 border rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2"
                        />
                    </div>

                    {/* Date input */}
                    <div className="mb-4">
                        <input
                            type="date"
                            value={data.concert_date}
                            onChange={e => setData("concert_date", e.target.value)}
                            className="w-full px-4 py-2 border rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2"
                        />
                    </div>

                    {/* Type select */}
                    <div className="mb-4">
                        <select
                            name="type"
                            value={data.type}
                            onChange={e => setData("type", e.target.value)}
                            className="w-full px-4 py-2 border rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2"
                        >
                            <option value="">Select Type</option>
                            {concertTypes.map(type => (
                                <option key={type.id} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Image URL input */}
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.concert_image}
                            onChange={e => setData("concert_image", e.target.value)}
                            placeholder="Image URL"
                            className="w-full px-4 py-2 border rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full px-4 py-2 bg-[#ff5252] text-white rounded-md hover:bg-[#ff6161] disabled:opacity-50"
                        >
                            {processing ? 'Updating...' : 'Update Concert'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
