import React from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

const ManageContacts = ({ contacts }) => {
    const bookingForm = useForm({
        type: "Booking",
        name: contacts?.Booking?.name || '',
        surname: contacts?.Booking?.surname || '',
        phone: contacts?.Booking?.phone || '',
        email: contacts?.Booking?.email || '',
    });

    // TODO: no need yet, remove in future if not will need
    // const pressForm = useForm({
    //     type: "Press",
    //     name: contacts?.Press?.name || '',
    //     surname: contacts?.Press?.surname || '',
    //     phone: contacts?.Press?.phone || '',
    //     email: contacts?.Press?.email || '',
    // });

    const infoForm = useForm({
        type: "Info",
        name: contacts?.Info?.name || '',
        surname: contacts?.Info?.surname || '',
        phone: contacts?.Info?.phone || '',
        email: contacts?.Info?.email || '',
    });

    const handleSubmit = (e, section, form) => {
        e.preventDefault();

        form.post('/admin/contacts', {
            data: {
                type: section,
                ...form.data,
            },
        });
    };

    const renderForm = (section, form) => (
        <div className="bg-[#1e242b] p-6 shadow-md rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4 text-white">{section}</h2>
            <form onSubmit={(e) => handleSubmit(e, section, form)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['name', 'surname', 'phone', 'email'].map((field) => (
                        <div key={field}>
                            <label className="block text-white capitalize">{field}</label>
                            <input
                                type={field === 'email' ? 'email' : 'text'}
                                className="w-full p-2 border rounded-lg bg-[#1e242b] text-white placeholder-gray-400 focus:outline-none focus:ring-2"
                                value={form.data[field]}
                                onChange={(e) => form.setData(field, e.target.value)}
                            />
                            {form.errors[field] && (
                                <div className="text-red-500 text-sm mt-1">{form.errors[field]}</div>
                            )}
                        </div>
                    ))}
                </div>
                <button
                    type="submit"
                    className="mt-4 w-50 bg-[#ff5252] text-white p-2 rounded-lg hover:bg-[#ff6161] disabled:bg-gray-400"
                    disabled={form.processing}
                >
                    Save {section}
                </button>
            </form>
        </div>
    );

    return (
        <AuthenticatedLayout>
            <div className="mx-auto mt-8 p-6">
                <h1 className="text-3xl font-bold mb-6 text-white">Manage Contacts</h1>
                {renderForm('Booking', bookingForm)}
                {/*{renderForm('Press', pressForm)}*/}
                {renderForm('Info', infoForm)}
            </div>
        </AuthenticatedLayout>
    );
};

export default ManageContacts;
