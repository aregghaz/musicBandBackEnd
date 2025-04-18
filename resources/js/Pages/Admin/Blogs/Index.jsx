import { Link, usePage, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function Index() {
    const { blogs: { data: blogs } } = usePage().props;
    const [search, setSearch] = useState("");
    const [isSearched, setIsSearched] = useState(false);
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get("search");
        if (searchParam) {
            setSearch(searchParam);
            setIsSearched(true);
        } else {
            setIsSearched(false);
        }
    }, []);

    const deleteBlog = (id) => {
        if (confirm("Are you sure?")) {
            router.delete(`/admin/blogs/${id}`);
        }
    };

    const handleSearch = () => {
        if (debouncedSearch.length >= 2) {
            router.get(`/admin/blogs`, { search });
        }
    };

    const handleResetSearch = () => {
        setSearch("");
        router.get(`/admin/blogs`, { search: "" });
    };

    return (
        <AuthenticatedLayout>
            <div className="w-full h-dvh bg-[#13181d] p-6">
                <div className="mx-auto bg-[#1e242b] p-6 rounded-lg shadow-md">
                    <h1 className="text-3xl font-semibold mb-6 text-center text-white">Manage Blogs</h1>

                    {/* Search Form */}
                    <div className="mb-6 flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder="Search blogs..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full p-3 border border-[#232a32] rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff5252]"
                        />
                        <button
                            onClick={handleSearch}
                            className="px-4 py-2 bg-[#ff5252] border-[#ff5252] text-white rounded-md hover:bg-[#ff6161]"
                        >
                            Search
                        </button>

                        {isSearched && (
                            <button
                                onClick={handleResetSearch}
                                className="ml-2 text-gray-500 hover:text-gray-300 text-2xl"
                            >
                                &times;
                            </button>
                        )}
                    </div>

                    <div className="mb-8 mt-10">
                        <Link href="/admin/blogs/create">
                            <PrimaryButton variant="danger" className="py-[10px] px-[20px] bg-indigo-600 hover:bg-indigo-400">
                                + Create New Blog
                            </PrimaryButton>
                        </Link>
                    </div>

                    {/* Blogs List */}
                    <ul className="space-y-6 overflow-y-auto rounded-lg" style={{ maxHeight: 'calc(100vh - 300px)' }}>
                        {blogs.length === 0 ? (
                            <li className="text-center text-gray-500">No blogs found</li>
                        ) : (
                            blogs.map((blog) => (
                                <li key={blog.id} className="p-6 border border-[#232a32] rounded-lg shadow-sm bg-[#1e242b]">
                                    <h2 className="text-xl font-bold mb-2 text-white">{blog.title}</h2>
                                    <p className="text-gray-400 mb-4">{blog.description}</p>

                                    {blog.image && (
                                        <div className="overflow-hidden rounded-md border border-[#232a32] mb-4 w-48 h-48">
                                            <img
                                                src={blog.image}
                                                alt={blog.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center">
                                        <Link href={`/admin/blogs/${blog.id}/edit`}>
                                            <PrimaryButton variant="danger" className="py-[10px] px-[20px] bg-indigo-600 hover:bg-indigo-400">
                                                Edit
                                            </PrimaryButton>
                                        </Link>

                                        <button
                                            onClick={() => deleteBlog(blog.id)}
                                            className="px-4 py-2 bg-[#ff5252] text-white rounded-md hover:bg-[#ff6161]"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
