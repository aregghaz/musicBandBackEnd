import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        album_name: '',
        released_date: '',
        album_image: 'https://via.placeholder.com/150',
        apple_link: '',
        amazon_link: '',
        spotify_link: '',
        youtube_link: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('albums.store')); // Change this to the correct route for storing albums
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Album
                </h2>
            }
        >
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Create Album</h1>
                <form onSubmit={submit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.album_name}
                            onChange={e => setData('album_name', e.target.value)}
                            placeholder="Album Name"
                            className="border p-2 w-full"
                        />
                        {errors.album_name && <div className="text-red-500">{errors.album_name}</div>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="date"
                            value={data.released_date}
                            onChange={e => setData('released_date', e.target.value)}
                            placeholder="Release Date"
                            className="border p-2 w-full"
                        />
                        {errors.released_date && <div className="text-red-500">{errors.released_date}</div>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.album_image}
                            onChange={e => setData('album_image', e.target.value)}
                            placeholder="Album Image URL"
                            className="border p-2 w-full"
                        />
                        {errors.album_image && <div className="text-red-500">{errors.album_image}</div>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.apple_link}
                            onChange={e => setData('apple_link', e.target.value)}
                            placeholder="Apple Music Link"
                            className="border p-2 w-full"
                        />
                        {errors.apple_link && <div className="text-red-500">{errors.apple_link}</div>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.amazon_link}
                            onChange={e => setData('amazon_link', e.target.value)}
                            placeholder="Amazon Link"
                            className="border p-2 w-full"
                        />
                        {errors.amazon_link && <div className="text-red-500">{errors.amazon_link}</div>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.spotify_link}
                            onChange={e => setData('spotify_link', e.target.value)}
                            placeholder="Spotify Link"
                            className="border p-2 w-full"
                        />
                        {errors.spotify_link && <div className="text-red-500">{errors.spotify_link}</div>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.youtube_link}
                            onChange={e => setData('youtube_link', e.target.value)}
                            placeholder="YouTube Link"
                            className="border p-2 w-full"
                        />
                        {errors.youtube_link && <div className="text-red-500">{errors.youtube_link}</div>}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Create
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
