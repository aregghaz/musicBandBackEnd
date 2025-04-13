import React from 'react';
import {useForm, usePage} from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

const ShowTours = () => {
    const {section} = usePage().props; // Directly access the section object

    const {data, setData, post, processing, errors} = useForm({
        title: section?.title || '',
        tours: (section?.tours ?? []).map(tour => ({
            pre_sale_start: tour.pre_sale_start,
            pre_sale_end: tour.pre_sale_end
        }))
    });

    const addForm = () => {
        setData('tours', [
            ...data.tours,
            {pre_sale_start: '', pre_sale_end: ''}
        ]);
    };

    const removeForm = (index) => {
        const updatedTours = data.tours.filter((_, i) => i !== index);
        setData('tours', updatedTours);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('upcoming-tour-sections.store', {id: section?.id}), {data});
    };

    return (
        <AuthenticatedLayout>
            <div className="mx-auto mt-8 p-6">
                <h1 className="text-3xl font-bold mb-6 text-white">Upcoming Tours</h1>

                <form onSubmit={handleSubmit}>
                    {/* Section Title Input */}
                    <div className="bg-[#1e242b] p-6 shadow-md rounded-lg mb-6">
                        <div className="flex-1">
                            <label htmlFor="title" className="block text-white mb-2">Tour Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="w-full p-2 border rounded-lg bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                            />
                            {errors.title && (
                                <div className="text-red-500 text-sm mt-1">{errors.title}</div>
                            )}
                        </div>
                    </div>

                    {/* Tours Form */}
                    {data.tours.map((tour, index) => (
                        <div key={index} className="bg-[#1e242b] p-6 shadow-md rounded-lg mb-6 relative">
                            <button
                                type="button"
                                onClick={() => removeForm(index)}
                                className="absolute top-2 right-2 text-white text-xl hover:text-red-500 focus:outline-none"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                     stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor={`pre_sale_start_${index}`} className="block text-white mb-1">Pre-Sale
                                        Start Date</label>
                                    <input
                                        type="date"
                                        id={`pre_sale_start_${index}`}
                                        className="w-full p-2 border rounded-lg bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none"
                                        value={tour.pre_sale_start}
                                        onChange={(e) => {
                                            const updatedTours = [...data.tours];
                                            updatedTours[index].pre_sale_start = e.target.value;
                                            setData('tours', updatedTours);
                                        }}
                                    />
                                    {errors.tours?.[index]?.pre_sale_start && (
                                        <div
                                            className="text-red-500 text-sm mt-1">{errors.tours[index].pre_sale_start} ads</div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor={`pre_sale_end_${index}`} className="block text-white mb-1">Pre-Sale
                                        End Date</label>
                                    <input
                                        type="date"
                                        id={`pre_sale_end_${index}`}
                                        className="w-full p-2 border rounded-lg bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none"
                                        value={tour.pre_sale_end}
                                        onChange={(e) => {
                                            const updatedTours = [...data.tours];
                                            updatedTours[index].pre_sale_end = e.target.value;
                                            setData('tours', updatedTours);
                                        }}
                                    />
                                    {errors.tours?.[index]?.pre_sale_end && (
                                        <div
                                            className="text-red-500 text-sm mt-1">{errors.tours[index].pre_sale_end}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="flex gap-4 mt-6">
                        <button
                            type="button"
                            onClick={addForm}
                            className="bg-[#ff5252] text-white px-4 py-2 rounded-lg hover:bg-[#ff6161]"
                        >
                            Add New Tour
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
};

export default ShowTours;
