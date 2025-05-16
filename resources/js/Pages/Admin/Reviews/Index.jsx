import { Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function Index({ reviews }) {
    const deleteReview = (id) => {
        if (confirm("Are you sure?")) {
            router.delete(`/admin/reviews/${id}`);
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="w-full h-dvh bg-[#13181d] p-6">
                <div className="mx-auto bg-[#1e242b] p-6 rounded-lg shadow-md">
                    <h1 className="text-3xl font-semibold mb-6 text-center text-white">Manage Reviews</h1>

                    <div className="mb-8 mt-10">
                        <Link href="/admin/reviews/create">
                            <PrimaryButton variant="danger" className="py-[10px] px-[20px] bg-indigo-600 hover:bg-indigo-400">
                                + Create New Review
                            </PrimaryButton>
                        </Link>
                    </div>

                    {/* Reviews Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-[#1e242b] border border-[#232a32] rounded-lg">
                            <thead>
                            <tr>
                                <th className="px-4 py-3 text-left text-white font-semibold border-b border-[#232a32]">Reviewer Name</th>
                                <th className="px-4 py-3 text-left text-white font-semibold border-b border-[#232a32]">Description</th>
                                <th className="px-4 py-3 text-left text-white font-semibold border-b border-[#232a32]">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {reviews.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="text-center text-gray-500 py-4">No reviews found</td>
                                </tr>
                            ) : (
                                reviews.map((review) => (
                                    <tr key={review.id} className="border-b border-[#232a32]">
                                        <td className="px-4 py-3 text-white">{review.reviewer_name}</td>
                                        <td className="px-4 py-3 text-gray-400">{review.reviewer_description}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex space-x-2">
                                                <Link href={`/admin/reviews/${review.id}/edit`}>
                                                    <PrimaryButton variant="danger" className="py-[8px] px-[16px] bg-indigo-600 hover:bg-indigo-400">
                                                        Edit
                                                    </PrimaryButton>
                                                </Link>

                                                <PrimaryButton
                                                    variant="danger"
                                                    onClick={() => deleteReview(review.id)}
                                                    className="p-0 !bg-[#ff5252]"
                                                >
                                                    Delete
                                                </PrimaryButton>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
