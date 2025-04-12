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
        <AuthenticatedLayout>
            <div className="p-6 bg-[#1e242b]">
                <h1 className="text-2xl font-bold mb-4 text-white">Edit Album</h1>
                <form onSubmit={submit}>
                    {/* Album Name */}
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.album_name}
                            onChange={e => setData('album_name', e.target.value)}
                            placeholder="Album Name"
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2"
                        />
                        {errors.album_name && <div className="text-red-500 mt-1">{errors.album_name}</div>}
                    </div>

                    {/* Release Date */}
                    <div className="mb-4">
                        <input
                            type="date"
                            value={data.released_date}
                            onChange={e => setData('released_date', e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2"
                        />
                        {errors.released_date && <div className="text-red-500 mt-1">{errors.released_date}</div>}
                    </div>

                    {/* Album Image URL */}
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.album_image}
                            onChange={e => setData('album_image', e.target.value)}
                            placeholder="Album Image URL"
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2"
                        />
                        {errors.album_image && <div className="text-red-500 mt-1">{errors.album_image}</div>}
                    </div>

                    {/* Apple Music Link */}
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.apple_link}
                            onChange={e => setData('apple_link', e.target.value)}
                            placeholder="Apple Music Link"
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2"
                        />
                        {errors.apple_link && <div className="text-red-500 mt-1">{errors.apple_link}</div>}
                    </div>

                    {/* Amazon Link */}
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.amazon_link}
                            onChange={e => setData('amazon_link', e.target.value)}
                            placeholder="Amazon Link"
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2"
                        />
                        {errors.amazon_link && <div className="text-red-500 mt-1">{errors.amazon_link}</div>}
                    </div>

                    {/* Spotify Link */}
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.spotify_link}
                            onChange={e => setData('spotify_link', e.target.value)}
                            placeholder="Spotify Link"
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2"
                        />
                        {errors.spotify_link && <div className="text-red-500 mt-1">{errors.spotify_link}</div>}
                    </div>

                    {/* YouTube Link */}
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.youtube_link}
                            onChange={e => setData('youtube_link', e.target.value)}
                            placeholder="YouTube Link"
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2"
                        />
                        {errors.youtube_link && <div className="text-red-500 mt-1">{errors.youtube_link}</div>}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full px-4 py-2 bg-[#ff5252] text-white rounded-md hover:bg-[#ff6161] disabled:opacity-50"
                        >
                            {processing ? 'Updating...' : 'Update Album'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
