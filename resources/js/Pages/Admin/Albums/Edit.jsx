import React, { useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ImageUpload from '@/Components/ImageUpload';

export default function Edit({ album }) {
    const { data, setData, post, processing, errors } = useForm({
        album_name: album?.album_name || '',
        album_label: album?.album_label || '',
        released_date: album?.released_date || '',
        album_genre: album?.album_genre || '',
        album_styles: album?.album_styles || '',
        album_image: null,
        remove_image: false,
        apple_link: album?.apple_link || '',
        amazon_link: album?.amazon_link || '',
        spotify_link: album?.spotify_link || '',
        youtube_link: album?.youtube_link || '',
        songs: (album?.songs ?? []).map((song) => ({
            id: song.id,
            song_title: song.song_title,
            song_owner: song.song_owner,
            song_lyrics: song.song_lyrics,
            song_link: song.song_link,
        })),
    });

    const [existingImage, setExistingImage] = useState(album?.album_image);

    const addSong = () => {
        setData('songs', [
            ...data.songs,
            { song_title: '', song_owner: '', song_lyrics: '', song_link: '' },
        ]);
    };

    const removeSong = (index) => {
        const updatedSongs = data.songs.filter((_, i) => i !== index);
        setData('songs', updatedSongs);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PATCH');
        formData.append('album_name', data.album_name);
        formData.append('album_label', data.album_label);
        formData.append('released_date', data.released_date);
        formData.append('album_genre', data.album_genre);
        formData.append('album_styles', data.album_styles);
        formData.append('apple_link', data.apple_link);
        formData.append('amazon_link', data.amazon_link);
        formData.append('spotify_link', data.spotify_link);
        formData.append('youtube_link', data.youtube_link);

        if (data.album_image) {
            formData.append('album_image', data.album_image);
        }
        formData.append('remove_image', data.remove_image ? '1' : '0');

        data.songs.forEach((song, index) => {
            formData.append(`songs[${index}][song_title]`, song.song_title);
            formData.append(`songs[${index}][song_owner]`, song.song_owner);
            formData.append(`songs[${index}][song_lyrics]`, song.song_lyrics);
            formData.append(`songs[${index}][song_link]`, song.song_link);
            if (song.id) {
                formData.append(`songs[${index}][id]`, song.id);
            }
        });

        router.post(`/admin/albums/${album.id}`, formData, {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="mx-auto mt-8 p-6">
                <h1 className="text-3xl font-bold mb-6 text-white">Edit Album</h1>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
                        {[
                            { label: 'Album Name', name: 'album_name' },
                            { label: 'Label', name: 'album_label' },
                            { label: 'Release Date', name: 'released_date', type: 'date' },
                            { label: 'Genre', name: 'album_genre' },
                            { label: 'Styles', name: 'album_styles' },
                            { label: 'Amazon Link', name: 'amazon_link' },
                            { label: 'Apple Music Link', name: 'apple_link' },
                            { label: 'YouTube Link', name: 'youtube_link' },
                            { label: 'Spotify Link', name: 'spotify_link', colSpan: 'lg:col-span-2' },
                        ].map(({ label, name, type = 'text', colSpan }) => (
                            <div key={name} className={colSpan}>
                                <label className="block text-white mb-1">{label}</label>
                                <input
                                    type={type}
                                    className="w-full p-2 border rounded-lg bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none"
                                    value={data[name]}
                                    onChange={(e) => setData(name, e.target.value)}
                                />
                                {errors[name] && (
                                    <div className="text-red-500 text-sm mt-1">{errors[name]}</div>
                                )}
                            </div>
                        ))}

                        <div className="col-span-full">
                            <label className="block text-white mb-1">Album Image</label>
                            <small className='block mb-4'>recommended size 730 x 400 </small>
                            <ImageUpload
                                onChange={(file) => {
                                    setData('album_image', file);
                                    if (file) setExistingImage(null);
                                }}
                                initialImage={existingImage}
                                onRemove={() => {
                                    setExistingImage(null);
                                    setData('album_image', null);
                                    setData('remove_image', true);
                                }}
                                cropWidth={730}
                                cropHeight={400}
                            />
                            {errors.album_image && (
                                <div className="text-red-500 text-sm mt-1">{errors.album_image}</div>
                            )}
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-4">Songs</h2>

                    {data.songs && data.songs.length ? (
                        data.songs.map((song, index) => (
                            <div key={index} className="bg-[#1e242b] p-6 shadow-md rounded-lg mb-6 relative">
                                <button
                                    type="button"
                                    onClick={() => removeSong(index)}
                                    className="absolute top-2 right-2 text-white text-xl hover:text-red-500 focus:outline-none"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        className="w-6 h-6"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { label: 'Song Title', name: 'song_title' },
                                        { label: 'Song Owner', name: 'song_owner' },
                                        { label: 'Song Link', name: 'song_link' },
                                    ].map(({ label, name }) => (
                                        <div key={name}>
                                            <label className="block text-white mb-1">{label}</label>
                                            <input
                                                type="text"
                                                className="w-full p-2 border rounded-lg bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none"
                                                value={song[name]}
                                                onChange={(e) => {
                                                    const updatedSongs = [...data.songs];
                                                    updatedSongs[index][name] = e.target.value;
                                                    setData('songs', updatedSongs);
                                                }}
                                            />
                                            {errors.songs?.[index]?.[name] && (
                                                <div className="text-red-500 text-sm mt-1">
                                                    {errors.songs[index][name]}
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    <div className="md:col-span-2">
                                        <label className="block text-white mb-1">Lyrics</label>
                                        <textarea
                                            className="w-full p-2 border rounded-lg bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none"
                                            value={song.song_lyrics}
                                            onChange={(e) => {
                                                const updatedSongs = [...data.songs];
                                                updatedSongs[index].song_lyrics = e.target.value;
                                                setData('songs', updatedSongs);
                                            }}
                                        />
                                        {errors.songs?.[index]?.song_lyrics && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {errors.songs[index].song_lyrics}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-white">No songs found at this moment</div>
                    )}

                    <div className="flex gap-4 mt-6">
                        <button
                            type="button"
                            onClick={addSong}
                            className="bg-[#ff5252] text-white px-4 py-2 rounded-lg hover:bg-[#ff6161]"
                        >
                            Add New Song
                        </button>

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 disabled:bg-gray-400"
                        >
                            {processing ? 'Saving...' : 'Save All'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
