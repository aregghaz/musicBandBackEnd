import {Link, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import React from "react";

export default function Create() {
    const {data, setData, post, processing, errors} = useForm({
        concert_city: "",
        concert_place: "",
        concert_date: "",
        type: "", // Keep type as value
        concert_image: "https://via.placeholder.com/150", // Default image URL
    });

    // Define concert types with label and value
    const concertTypes = [
        {id: 1, label: 'American', value: 1},
        {id: 2, label: 'Armenian', value: 2},
    ];

    // Submit the form
    function submit(e) {
        e.preventDefault();
        post(route("concerts.store"));
    }

    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-[#1e242b]">
                <h1 className="text-2xl font-bold mb-4 text-white">Create Concert</h1>
                <form onSubmit={submit}>
                    {/* City input */}
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.concert_city}
                            onChange={e => setData("concert_city", e.target.value)}
                            placeholder="City"
                            className="w-full px-4 py-2  rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2"
                        />
                    </div>

                    {/* Place input */}
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.concert_place}
                            onChange={e => setData("concert_place", e.target.value)}
                            placeholder="Place"
                            className="w-full px-4 py-2  rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2"
                        />
                    </div>

                    {/* Date input */}
                    <div className="mb-4">
                        <input
                            type="date"
                            value={data.concert_date}
                            onChange={e => setData("concert_date", e.target.value)}
                            className="w-full px-4 py-2  rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2"
                        />
                    </div>

                    {/* Type select */}
                    <div className="mb-4">
                        <select
                            name="type"
                            value={data.type}
                            onChange={e => setData("type", e.target.value)}
                            className="w-full px-4 py-2  rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2"
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
                    {/*<div className="mb-4">*/}
                    {/*    <input*/}
                    {/*        type="text"*/}
                    {/*        value={data.concert_image}*/}
                    {/*        onChange={e => setData("concert_image", e.target.value)}*/}
                    {/*        placeholder="Image URL"*/}
                    {/*        className="w-full px-4 py-2  rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2"*/}
                    {/*    />*/}
                    {/*</div>*/}

                    {/* Submit Button */}
                    <div>
                        <PrimaryButton
                            variant="danger"
                            type="submit"
                            disabled={processing}
                            className="p-0 mt-4 !bg-[#ff5252]"
                        >
                            {processing ? 'Creating...' : 'Create Concert'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
