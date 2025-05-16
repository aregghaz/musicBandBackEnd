import { useForm, usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import React from "react";

export default function Edit() {
    const { review } = usePage().props;

    const { data, setData, errors } = useForm({
        reviewer_name: review.reviewer_name,
        reviewer_description: review.reviewer_description,
        review_hide: review.review_hide,
    });

    const submit = (e) => {
        e.preventDefault();
        router.put(`/admin/reviews/${review.id}`, data);
    };

    return (
        <AuthenticatedLayout>
            <div className="flex justify-center items-center min-h-screen bg-[#13181d]">
                <div className="max-w-2xl w-full p-6 bg-[#1e242b] rounded-lg shadow-md">
                    <h1 className="text-3xl font-semibold mb-6 text-center text-white">Edit Review</h1>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label htmlFor="reviewer_name" className="block text-sm font-medium text-gray-300 mb-1">
                                Reviewer Name
                            </label>
                            <input
                                type="text"
                                id="reviewer_name"
                                value={data.reviewer_name}
                                onChange={(e) => setData("reviewer_name", e.target.value)}
                                placeholder="Enter reviewer name"
                                className="w-full p-3 border border-[#232a32] rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff5252] transition"
                            />
                            {errors.reviewer_name && <p className="text-red-500 text-sm mt-1">{errors.reviewer_name}</p>}
                        </div>

                        <div>
                            <label htmlFor="reviewer_description" className="block text-sm font-medium text-gray-300 mb-1">
                                Description
                            </label>
                            <textarea
                                id="reviewer_description"
                                value={data.reviewer_description}
                                onChange={(e) => setData("reviewer_description", e.target.value)}
                                placeholder="Enter review description"
                                className="w-full p-3 border border-[#232a32] rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff5252] transition"
                                rows="5"
                            />
                            {errors.reviewer_description && <p className="text-red-500 text-sm mt-1">{errors.reviewer_description}</p>}
                        </div>

                        <div>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={data.review_hide}
                                    onChange={(e) => setData("review_hide", e.target.checked)}
                                    className="mr-2 h-4 w-4 text-[#ff5252] border-[#232a32] focus:ring-[#ff5252] bg-[#1e242b]"
                                />
                                <span className="text-gray-300">Hide Review</span>
                            </label>
                            {errors.review_hide && <p className="text-red-500 text-sm mt-1">{errors.review_hide}</p>}
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full py-3 bg-[#ff5252] text-white rounded-md hover:bg-[#ff6161] transition"
                            >
                                Update Review
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
