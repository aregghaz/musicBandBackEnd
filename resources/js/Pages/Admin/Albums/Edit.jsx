import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ album }) {
    const { data, setData, patch, processing, errors } = useForm({
        album_name: album.album_name,
        released_date: album.released_date,
        album_image: album.album_image,
        apple_link: album.apple_link || '',
        amazon_link: album.amazon_link || '',
        spotify_link: album.spotify_link || '',
        youtube_link: album.youtube_link || '',
    });

    function submit(e) {
        e.preventDefault();
        patch(route('albums.update', album.id));
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Album
                </h2>
            }
        >
            <div className="p-8 bg-gray-50 min-h-screen">
                <h1 className="text-3xl font-semibold mb-6 text-gray-800">Edit Album</h1>

                <div className="bg-white shadow-md rounded-lg p-6">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Album Name */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Album Name</label>
                            <input
                                type="text"
                                value={data.album_name}
                                onChange={(e) => setData('album_name', e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                                placeholder="Enter Album Name"
                            />
                            {errors.album_name && <p className="text-red-500 text-sm mt-1">{errors.album_name}</p>}
                        </div>

                        {/* Released Date */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Release Date</label>
                            <input
                                type="date"
                                value={data.released_date}
                                onChange={(e) => setData('released_date', e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                            />
                            {errors.released_date && <p className="text-red-500 text-sm mt-1">{errors.released_date}</p>}
                        </div>

                        {/* Album Cover Image */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Album Cover Image URL</label>
                            <input
                                type="text"
                                value={data.album_image}
                                onChange={(e) => setData('album_image', e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                                placeholder="Enter Image URL"
                            />
                            {errors.album_image && <p className="text-red-500 text-sm mt-1">{errors.album_image}</p>}
                        </div>

                        {/* Streaming Links */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Apple Music Link (Optional)</label>
                            <input
                                type="text"
                                value={data.apple_link}
                                onChange={(e) => setData('apple_link', e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                                placeholder="Apple Music URL"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Amazon Music Link (Optional)</label>
                            <input
                                type="text"
                                value={data.amazon_link}
                                onChange={(e) => setData('amazon_link', e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                                placeholder="Amazon Music URL"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Spotify Link (Optional)</label>
                            <input
                                type="text"
                                value={data.spotify_link}
                                onChange={(e) => setData('spotify_link', e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                                placeholder="Spotify URL"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">YouTube Link (Optional)</label>
                            <input
                                type="text"
                                value={data.youtube_link}
                                onChange={(e) => setData('youtube_link', e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                                placeholder="YouTube URL"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="mt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className={`px-6 py-2 text-white font-medium rounded-lg shadow-md ${
                                    processing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 transition duration-300'
                                }`}
                            >
                                {processing ? 'Updating...' : 'Update Album'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
