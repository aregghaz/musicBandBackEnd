import React from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

const ManageSettings = ({ settings }) => {

    const presentationForm = useForm({
        section: 'presentation',
        title: settings?.title || '',
        description: settings?.description || '',
        upcoming_date_from: settings?.upcoming_date_from || '',
        upcoming_date_to: settings?.upcoming_date_to || '',
        upcoming_location: settings?.upcoming_location || '',
        upcoming_state: settings?.upcoming_state || '',
        upcoming_country: settings?.upcoming_country || '',
    });

    const socialForm = useForm({
        section: 'social',
        instagram_link: settings?.instagram_link || '',
        facebook_link: settings?.facebook_link || '',
        twitter_link: settings?.twitter_link || '',
        youtube_link: settings?.youtube_link || '',
        apple_link: settings?.apple_link || '',
        amazon_link: settings?.amazon_link || '',
    });

    const handleSubmit = (e, section, form) => {
        e.preventDefault();
        form.post('/admin/settings', {
            data: {
                section,
                ...form.data,
            },
        });
    };

    const renderForm = (sectionTitle, form, fields, disabledFields = []) => (
        <div className="bg-white p-6 shadow-md rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">{sectionTitle}</h2>
            <form onSubmit={(e) => handleSubmit(e, form.section, form)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fields.map((field) => {
                        const isDate = ['upcoming_date_from', 'upcoming_date_to'].includes(field);
                        const isDisabled = disabledFields.includes(field);
                        return (
                            <div key={field}>
                                <label className="block text-gray-700 capitalize">
                                    {field.replace(/_/g, ' ')}
                                </label>
                                {field === 'image' ? (
                                    <input
                                        type="file"
                                        className="w-full p-2 border rounded-lg"
                                        disabled={true} // Image input is disabled
                                    />
                                ) : (
                                    <input
                                        type={isDate ? 'date' : 'text'}
                                        className="w-full p-2 border rounded-lg"
                                        value={form.data[field]}
                                        onChange={(e) => form.setData(field, e.target.value)}
                                        disabled={isDisabled || form.processing}
                                    />
                                )}
                                {form.errors[field] && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {form.errors[field]}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                <button
                    type="submit"
                    className="mt-4 w-50 bg-blue-600 text-white p-2 rounded-lg disabled:bg-gray-400"
                    disabled={form.processing}
                >
                    Save {sectionTitle}
                </button>
            </form>
        </div>
    );

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto mt-8">
                <h1 className="text-3xl font-bold mb-6">Manage Settings</h1>
                {renderForm('Presentation Section', presentationForm, [
                    'title', 'description',
                    'upcoming_date_from', 'upcoming_date_to',
                    'upcoming_location', 'upcoming_state', 'upcoming_country',
                    'image', // Image field added here
                ])}
                {renderForm('Social Links', socialForm, [
                    'instagram_link', 'facebook_link', 'twitter_link',
                    'youtube_link', 'apple_link', 'amazon_link',
                ])}
            </div>
        </AuthenticatedLayout>
    );
};

export default ManageSettings;
