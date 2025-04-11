import {usePage, Link, router} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function Index() {
    const {albums} = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this album?")) {
            router.delete(`/admin/albums/${id}`);
        }
    };

    return (
        <AuthenticatedLayout
        >
            <div className="p-6 bg-[#1e242b] min-h-screen">
                <h1 className="text-2xl font-bold mb-4 text-white">Albums</h1>

                <div className="mb-6 flex justify-between items-center">
                    <Link
                        href={route("albums.create")}
                        className="bg-[#ff5252] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#ff6161] transition duration-300"
                    >
                        + Add Album
                    </Link>
                </div>

                <div className="overflow-x-auto bg-[#232a32] shadow-lg rounded-lg">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#232a32] text-white border-[#484a4d]">
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
                        <tbody className="text-white ">
                        {albums.map((album) => (
                            <tr key={album.id} className="hover:bg-[#2a2f37] transition-colors">
                                <td className="px-4 py-3 border-b">
                                    {album.album_image ? (
                                        <img
                                            src={`/storage/${album.album_image}`}
                                            alt={album.album_name}
                                            className="w-12 h-12 rounded-md border border-indigo-400 shadow-sm"
                                        />
                                    ) : (
                                        <span className="text-slate-400">No Image</span>
                                    )}
                                </td>
                                <td className="px-4 py-3 border-b">{album.album_name}</td>
                                <td className="px-4 py-3 border-b">{album.released_date}</td>
                                <td className="px-4 py-3 border-b">
                                    {album.apple_link ? (
                                        <a
                                            href={album.apple_link}
                                            target="_blank"
                                            className="text-indigo-400 hover:text-indigo-300 transition duration-300"
                                        >
                                            Apple Music
                                        </a>
                                    ) : (
                                        "N/A"
                                    )}
                                </td>
                                <td className="px-4 py-3 border-b">
                                    {album.amazon_link ? (
                                        <a
                                            href={album.amazon_link}
                                            target="_blank"
                                            className="text-indigo-400 hover:text-indigo-300 transition duration-300"
                                        >
                                            Amazon Music
                                        </a>
                                    ) : (
                                        "N/A"
                                    )}
                                </td>
                                <td className="px-4 py-3 border-b">
                                    {album.spotify_link ? (
                                        <a
                                            href={album.spotify_link}
                                            target="_blank"
                                            className="text-indigo-400 hover:text-indigo-300 transition duration-300"
                                        >
                                            Spotify
                                        </a>
                                    ) : (
                                        "N/A"
                                    )}
                                </td>
                                <td className="px-4 py-3 border-b">
                                    {album.youtube_link ? (
                                        <a
                                            href={album.youtube_link}
                                            target="_blank"
                                            className="text-indigo-400 hover:text-indigo-300 transition duration-300"
                                        >
                                            YouTube
                                        </a>
                                    ) : (
                                        "N/A"
                                    )}
                                </td>


                                <td className="px-4 py-3 border-b flex space-x-4">
                                    <Link href={route("albums.edit", album.id)}>
                                        <PrimaryButton variant="danger" className="p-0 bg-indigo-600">
                                            Edit
                                        </PrimaryButton>
                                    </Link>
                                    <PrimaryButton
                                        variant="danger"
                                        onClick={() => handleDelete(album.id)}
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
