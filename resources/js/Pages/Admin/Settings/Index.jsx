import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import ImageUpload from "@/Components/ImageUpload.jsx";

const ManageSettings = ({ settings }) => {


    const presentationForm = useForm({
        section: 'presentation',
        title: settings?.title || '',
        description: settings?.description || '',
        about_background_image: null,
        remove_about_background_image: false,
        about_background_image_mob: null,
        remove_about_background_image_mob: false,
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

    const [existingImage, setExistingImage] = useState(settings?.about_background_image);
    const [existingImageMob, setExistingImageMob] = useState(settings?.about_background_image_mob);

    const handleSubmit = (e, section, form) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(form.data).forEach(([key, value]) => {

            if ((key === 'about_background_image' || key === 'about_background_image_mob') && value) {
                formData.append(key, value);
            } else if (key === 'remove_about_background_image' || key === 'remove_about_background_image_mob') {
                formData.append(key, value ? '1' : '0');
            } else if (value) {
                formData.append(key, value);
            }
        });

        router.post('/admin/settings', formData, {
            forceFormData: true,
        });
    };

    const renderForm = (sectionTitle, form, fields, disabledFields = []) => (
        <div className="bg-[#1e242b] p-6 shadow-md rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4 text-white">{sectionTitle}</h2>
            <form onSubmit={(e) => handleSubmit(e, form.data.section, form)}>
                <div className="flex flex-col gap-4">
                    {fields.map((field) => {

                        console.log(field,'field')
                        const isDisabled = disabledFields.includes(field);
                        const isDescription = field === 'description';
                        const isAboutBackgroundImage = field === 'about_background_image';
                        const isAboutBackgroundImageMob = field === 'about_background_image_mob';

                        return (
                            <div key={field}>
                                <label className="block text-white capitalize">
                                    {field.replace(/_/g, ' ')}
                                </label>
                                {isDescription ? (
                                    <textarea
                                        className="w-full p-2 border rounded-lg bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none h-60 resize-y"
                                        value={form.data[field] || ''}
                                        onChange={(e) => form.setData(field, e.target.value)}
                                        disabled={isDisabled || form.processing}
                                        placeholder="Enter description"
                                    />
                                ) : isAboutBackgroundImageMob ? (
                                    <>
                                        <small className="block mb-4">Recommended size 480 x 720</small>
                                        <ImageUpload
                                            onChange={(file) => {
                                                form.setData('about_background_image_mob', file);
                                                if (file) setExistingImageMob(null);
                                            }}
                                            initialImage={existingImageMob}
                                            onRemove={() => {
                                                setExistingImageMob(null);
                                                form.setData('about_background_image_mob', null);
                                                form.setData('remove_about_background_image_mob', true);
                                            }}
                                            cropWidth={480}
                                            cropHeight={720}
                                        />
                                    </>
                                ) : isAboutBackgroundImage ? (
                                    <>
                                        <small className="block mb-4">Recommended size 780 x 520</small>
                                        <ImageUpload
                                            onChange={(file) => {
                                                form.setData('about_background_image', file);
                                                if (file) setExistingImage(null);
                                            }}
                                            initialImage={existingImage}
                                            onRemove={() => {
                                                setExistingImage(null);
                                                form.setData('about_background_image', null);
                                                form.setData('remove_about_background_image', true);
                                            }}
                                            cropWidth={780}
                                            cropHeight={520}
                                        />
                                    </>
                                ) :  (
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded-lg bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none"
                                        value={form.data[field] || ''}
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
                    'title', 'description', 'about_background_image', 'about_background_image_mob',
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
