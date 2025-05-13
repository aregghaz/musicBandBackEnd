import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import React from "react";

export default function Manage({ homeSection }) {
    const { data, setData, put, processing, errors } = useForm({
        slider_section: homeSection?.slider_section ?? false,
        about_section: homeSection?.about_section ?? false,
        album_section: homeSection?.album_section ?? false,
        latest_album_section: homeSection?.latest_album_section ?? false,
        contacts_section: homeSection?.contacts_section ?? false,
        tours_section: homeSection?.tours_section ?? false,
        concerts_section: homeSection?.concerts_section ?? false,
        band_members_section: homeSection?.band_members_section ?? false,
        gallery_section: homeSection?.gallery_section ?? false,
        blogs_section: homeSection?.blogs_section ?? false,
    });

    function submit(e) {
        e.preventDefault();
        put(route("home-sections.update", 1));
    }

    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-[#1e242b]">
                <h1 className="text-2xl font-bold mb-4 text-white">Manage Home Sections</h1>
                <form onSubmit={submit} className={'mt-6'}>
                    {/* Slider Section */}
                    <div className="mb-4 flex items-center">
                        <label className="text-white mr-4 w-60">Slider Section</label>
                        <input
                            type="checkbox"
                            checked={data.slider_section}
                            onChange={(e) => setData("slider_section", e.target.checked)}
                            className="form-checkbox h-5 w-5 text-[#ff5252] bg-[#1e242b] border-gray-400 focus:ring-[#ff5252]"
                        />
                        {errors.slider_section && (
                            <span className="text-red-500 text-sm ml-2">{errors.slider_section}</span>
                        )}
                    </div>

                    {/* About Section */}
                    <div className="mb-4 flex items-center">
                        <label className="text-white mr-4 w-60">About Section</label>
                        <input
                            type="checkbox"
                            checked={data.about_section}
                            onChange={(e) => setData("about_section", e.target.checked)}
                            className="form-checkbox h-5 w-5 text-[#ff5252] bg-[#1e242b] border-gray-400 focus:ring-[#ff5252]"
                        />
                        {errors.about_section && (
                            <span className="text-red-500 text-sm ml-2">{errors.about_section}</span>
                        )}
                    </div>

                    {/* Album Section */}
                    <div className="mb-4 flex items-center">
                        <label className="text-white mr-4 w-60">Album Section</label>
                        <input
                            type="checkbox"
                            checked={data.album_section}
                            onChange={(e) => setData("album_section", e.target.checked)}
                            className="form-checkbox h-5 w-5 text-[#ff5252] bg-[#1e242b] border-gray-400 focus:ring-[#ff5252]"
                        />
                        {errors.album_section && (
                            <span className="text-red-500 text-sm ml-2">{errors.album_section}</span>
                        )}
                    </div>

                    {/* Latest Album Section */}
                    <div className="mb-4 flex items-center">
                        <label className="text-white mr-4 w-60">Latest Album Section</label>
                        <input
                            type="checkbox"
                            checked={data.latest_album_section}
                            onChange={(e) => setData("latest_album_section", e.target.checked)}
                            className="form-checkbox h-5 w-5 text-[#ff5252] bg-[#1e242b] border-gray-400 focus:ring-[#ff5252]"
                        />
                        {errors.latest_album_section && (
                            <span className="text-red-500 text-sm ml-2">{errors.latest_album_section}</span>
                        )}
                    </div>

                    {/* Contacts Section */}
                    <div className="mb-4 flex items-center">
                        <label className="text-white mr-4 w-60">Contacts Section</label>
                        <input
                            type="checkbox"
                            checked={data.contacts_section}
                            onChange={(e) => setData("contacts_section", e.target.checked)}
                            className="form-checkbox h-5 w-5 text-[#ff5252] bg-[#1e242b] border-gray-400 focus:ring-[#ff5252]"
                        />
                        {errors.contacts_section && (
                            <span className="text-red-500 text-sm ml-2">{errors.contacts_section}</span>
                        )}
                    </div>

                    {/* Blogs Section */}
                    <div className="mb-4 flex items-center">
                        <label className="text-white mr-4 w-60">Blogs Section</label>
                        <input
                            type="checkbox"
                            checked={data.blogs_section}
                            onChange={(e) => setData("blogs_section", e.target.checked)}
                            className="form-checkbox h-5 w-5 text-[#ff5252] bg-[#1e242b] border-gray-400 focus:ring-[#ff5252]"
                        />
                        {errors.blogs_section && (
                            <span className="text-red-500 text-sm ml-2">{errors.blogs_section}</span>
                        )}
                    </div>


                    {/* Tours Section */}
                    <div className="mb-4 flex items-center">
                        <label className="text-white mr-4 w-60">Tours / upcoming Tour date Sections</label>
                        <input
                            type="checkbox"
                            checked={data.tours_section}
                            onChange={(e) => setData("tours_section", e.target.checked)}
                            className="form-checkbox h-5 w-5 text-[#ff5252] bg-[#1e242b] border-gray-400 focus:ring-[#ff5252]"
                        />
                        {errors.tours_section && (
                            <span className="text-red-500 text-sm ml-2">{errors.tours_section}</span>
                        )}
                    </div>

                    {/* Concerts Section */}
                    <div className="mb-4 flex items-center">
                        <label className="text-white mr-4 w-60">Concerts Section</label>
                        <input
                            type="checkbox"
                            checked={data.concerts_section}
                            onChange={(e) => setData("concerts_section", e.target.checked)}
                            className="form-checkbox h-5 w-5 text-[#ff5252] bg-[#1e242b] border-gray-400 focus:ring-[#ff5252]"
                        />
                        {errors.concerts_section && (
                            <span className="text-red-500 text-sm ml-2">{errors.concerts_section}</span>
                        )}
                    </div>

                    {/* Band members Section */}
                    <div className="mb-4 flex items-center">
                        <label className="text-white mr-4 w-60">Band Members Section</label>
                        <input
                            type="checkbox"
                            checked={data.band_members_section}
                            onChange={(e) => setData("band_members_section", e.target.checked)}
                            className="form-checkbox h-5 w-5 text-[#ff5252] bg-[#1e242b] border-gray-400 focus:ring-[#ff5252]"
                        />
                        {errors.band_members_section && (
                            <span className="text-red-500 text-sm ml-2">{errors.band_members_section}</span>
                        )}
                    </div>

                    {/* Gallery Section */}
                    <div className="mb-4 flex items-center">
                        <label className="text-white mr-4 w-60">Gallery Section</label>
                        <input
                            type="checkbox"
                            checked={data.gallery_section}
                            onChange={(e) => setData("gallery_section", e.target.checked)}
                            className="form-checkbox h-5 w-5 text-[#ff5252] bg-[#1e242b] border-gray-400 focus:ring-[#ff5252]"
                        />
                        {errors.gallery_section && (
                            <span className="text-red-500 text-sm ml-2">{errors.gallery_section}</span>
                        )}
                    </div>

                    {/* Save Button */}
                    <div>
                        <PrimaryButton
                            variant="danger"
                            type="submit"
                            disabled={processing}
                            className="p-0 mt-4 !bg-[#ff5252]"
                        >
                            {processing ? "Saving..." : "Save"}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
