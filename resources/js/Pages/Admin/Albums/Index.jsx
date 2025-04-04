import { usePage, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

export default function Index() {
    const { albums } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this album?")) {
            router.delete(`/admin/albums/${id}`);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Albums
                </h2>
            }
        >
            <div className="p-8 bg-gray-50 min-h-screen">
                <h1 className="text-3xl font-semibold mb-6 text-gray-800">Albums</h1>

                <div className="mb-6 flex justify-between items-center">
                    <Link
                        href={route("albums.create")}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        + Add Album
                    </Link>
                </div>

                <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-blue-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-3 border-b">Image</th>
                            <th className="px-4 py-3 border-b">Album Name</th>
                            <th className="px-4 py-3 border-b">Release Date</th>
                            <th className="px-4 py-3 border-b">Apple Music</th>
                            <th className="px-4 py-3 border-b">Amazon Music</th>
                            <th className="px-4 py-3 border-b">Spotify</th>
                            <th className="px-4 py-3 border-b">YouTube</th>
                            <th className="px-4 py-3 border-b">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {albums.map((album) => (
                            <tr key={album.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 border-b">
                                    {album.album_image ? (
                                        <img
                                            src={`/storage/${album.album_image}`}
                                            alt={album.album_name}
                                            className="w-12 h-12 rounded-md border shadow-sm"
                                        />
                                    ) : (
                                        "No Image"
                                    )}
                                </td>
                                <td className="px-4 py-3 border-b">{album.album_name}</td>
                                <td className="px-4 py-3 border-b">{album.released_date}</td>
                                <td className="px-4 py-3 border-b">
                                    {album.apple_link ? (
                                        <a
                                            href={album.apple_link}
                                            target="_blank"
                                            className="text-blue-600 hover:text-blue-800 transition duration-300"
                                        >
                                            Apple Music
                                        </a>
                                    ) : (
                                        "Not Available"
                                    )}
                                </td>
                                <td className="px-4 py-3 border-b">
                                    {album.amazon_link ? (
                                        <a
                                            href={album.amazon_link}
                                            target="_blank"
                                            className="text-blue-600 hover:text-blue-800 transition duration-300"
                                        >
                                            Amazon Music
                                        </a>
                                    ) : (
                                        "Not Available"
                                    )}
                                </td>
                                <td className="px-4 py-3 border-b">
                                    {album.spotify_link ? (
                                        <a
                                            href={album.spotify_link}
                                            target="_blank"
                                            className="text-blue-600 hover:text-blue-800 transition duration-300"
                                        >
                                            Spotify
                                        </a>
                                    ) : (
                                        "Not Available"
                                    )}
                                </td>
                                <td className="px-4 py-3 border-b">
                                    {album.youtube_link ? (
                                        <a
                                            href={album.youtube_link}
                                            target="_blank"
                                            className="text-blue-600 hover:text-blue-800 transition duration-300"
                                        >
                                            YouTube
                                        </a>
                                    ) : (
                                        "Not Available"
                                    )}
                                </td>
                                <td className="px-4 py-3 border-b">
                                    <Link
                                        href={route("albums.edit", album.id)}
                                        className="text-blue-600 hover:text-blue-800 transition duration-300"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(album.id)}
                                        className="text-red-600 hover:text-red-800 transition duration-300 ml-3"
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
