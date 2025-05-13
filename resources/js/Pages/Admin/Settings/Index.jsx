import React from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

const ManageSettings = ({ settings }) => {
    const presentationForm = useForm({
        section: 'presentation',
        title: settings?.title || '',
        description: settings?.description || '',
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
        <div className="bg-[#1e242b] p-6 shadow-md rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4 text-white">{sectionTitle}</h2>
            <form onSubmit={(e) => handleSubmit(e, form.section, form)}>
                <div className="flex flex-col gap-4">
                    {fields.map((field) => {

                        const isDisabled = disabledFields.includes(field);
                        const isDescription = field === 'description';

                        return (
                            <div key={field}>
                                <label className="block text-white capitalize">
                                    {field.replace(/_/g, ' ')}
                                </label>
                                {isDescription ? (
                                    <textarea
                                        className="w-full p-2 border rounded-lg bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none h-60 resize-y"
                                        value={form.data[field]}
                                        onChange={(e) => form.setData(field, e.target.value)}
                                        disabled={isDisabled || form.processing}
                                        placeholder="Enter description"
                                    />
                                ) : (
                                    <input
                                        type={'text'}
                                        className="w-full p-2 border rounded-lg bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none"
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
                <PrimaryButton
                    type="submit"
                    className="mt-4 !bg-[#ff5252] text-white p-2 rounded-lg hover:!bg-[#ff6161] disabled:!bg-gray-400"
                    disabled={form.processing}
                >
                    Save {sectionTitle}
                </PrimaryButton>
            </form>
        </div>
    );

    return (
        <AuthenticatedLayout>
            <div className="mx-auto mt-8 p-6">
                <h1 className="text-3xl font-bold mb-6 text-white">Manage Settings</h1>
                {renderForm('About Section', presentationForm, [
                    'title', 'description',
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
