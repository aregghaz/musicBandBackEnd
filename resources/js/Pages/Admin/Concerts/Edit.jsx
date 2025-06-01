import {Link, router, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import React, {useState} from "react";
import ImageUpload from "@/Components/ImageUpload.jsx";

export default function Edit({ concert }) {
    const { data, setData, put, processing, errors } = useForm({
        concert_city: concert.concert_city,
        concert_place: concert.concert_place,
        concert_date: concert.concert_date,
        type: "1",
        concert_image:null,
        buy_ticket_link: concert.buy_ticket_link || null,
        remove_image: false,
    });
    const [existingImage, setExistingImage] = useState(concert.concert_image);
    // const concertTypes = [
    //     { id: 1, label: 'American', value: 1 },
    //     { id: 2, label: 'Armenian', value: 2 },
    // ];

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("_method", "PATCH");
        formData.append("concert_city", data.concert_city);
        formData.append("concert_place", data.concert_place);
        formData.append("type", '1');

        if(data.buy_ticket_link){
            formData.append("buy_ticket_link", data.buy_ticket_link);
        }

        if (data.concert_image) {
            formData.append("concert_image", data.concert_image);
        }

        formData.append("remove_image", data.remove_image ? "1" : "0");

        router.post(`/admin/concerts/${concert.id}`, formData, {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6 bg-[#1e242b]">
                <h1 className="text-2xl font-bold mb-4 text-white">Edit Concert</h1>
                <form onSubmit={submit}>
                    {/* City input */}
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.concert_city}
                            onChange={e => setData("concert_city", e.target.value)}
                            placeholder="City"
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2"
                        />
                        {errors.concert_city && (
                            <span className="text-red-500 text-sm">{errors.concert_city}</span>
                        )}
                    </div>

                    {/* Place input */}
                    <div className="mb-4">
                        <input
                            type="text"
                            value={data.concert_place}
                            onChange={e => setData("concert_place", e.target.value)}
                            placeholder="Place"
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2"
                        />
                        {errors.concert_place && (
                            <span className="text-red-500 text-sm">{errors.concert_place}</span>
                        )}
                    </div>

                    {/* Date input */}
                    <div className="mb-4">
                        <input
                            type="date"
                            value={data.concert_date}
                            onChange={e => setData("concert_date", e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2"
                        />
                        {errors.concert_date && (
                            <span className="text-red-500 text-sm">{errors.concert_date}</span>
                        )}
                    </div>

                    {/* Type select */}
                    {/*<div className="mb-4">*/}
                    {/*    <select*/}
                    {/*        name="type"*/}
                    {/*        value={data.type}*/}
                    {/*        onChange={e => setData("type", e.target.value)}*/}
                    {/*        className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2"*/}
                    {/*    >*/}
                    {/*        <option value="">Select Type</option>*/}
                    {/*        {concertTypes.map(type => (*/}
                    {/*            <option key={type.id} value={type.value}>*/}
                    {/*                {type.label}*/}
                    {/*            </option>*/}
                    {/*        ))}*/}
                    {/*    </select>*/}
                    {/*    {errors.type && (*/}
                    {/*        <span className="text-red-500 text-sm">{errors.type}</span>*/}
                    {/*    )}*/}
                    {/*</div>*/}

                    <div className={'mt-4 mb-4'}>
                        <label htmlFor="slider_image" className="block text-white">
                            Image
                        </label>
                        <small className="block mb-4">recommended size 360 x 400</small>
                        <ImageUpload
                            initialImage={existingImage}
                            onChange={(file) => {
                                setData("concert_image", file);
                            }}
                            onRemove={() => {
                                setExistingImage(null);
                                setData("concert_image", null);
                                setData("remove_image", true);
                            }}
                            // cropWidth={360}
                            // cropHeight={400}
                        />
                        {errors.slider_image && (
                            <p className="text-red-600 text-sm">{errors.slider_image}</p>
                        )}
                    </div>

                    {/* Buy Ticket Link input */}
                    <div className="mb-4">
                        <input
                            type="url"
                            value={data.buy_ticket_link}
                            onChange={e => setData("buy_ticket_link", e.target.value)}
                            placeholder="Buy Ticket URL"
                            className="w-full px-4 py-2 rounded-md bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2"
                        />
                        {errors.buy_ticket_link && (
                            <span className="text-red-500 text-sm">{errors.buy_ticket_link}</span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <PrimaryButton
                            variant="danger"
                            type="submit"
                            disabled={processing}
                            className="p-0 mt-4 !bg-[#ff5252]"
                        >
                            {processing ? 'Updating...' : 'Update Concert'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
