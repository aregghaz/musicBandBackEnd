import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Link, usePage } from '@inertiajs/react';

const navItems = [
    { label: 'Manage Blogs', route: 'blogs.index' },
    { label: 'Manage Concerts', route: 'concerts.index' },
    { label: 'Manage Band Members', route: 'band-members.index' },
    { label: 'Manage Albums', route: 'albums.index' },
    { label: 'Manage Contacts', route: 'contacts.showForm' },
    { label: 'Manage Settings', route: 'settings.index' },
    { label: 'Manage Sliders', route: 'sliders.index' },
];

export default function Dashboard() {
    const { locale } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-3">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <nav className="p-4 rounded-t-lg">
                            <ul className="space-y-6">
                                {navItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={route(item.route, { locale })}
                                            className="flex items-center p-4 rounded-md hover:bg-gray-100 transition duration-300"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-6 h-6 mr-3 text-gray-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3 8l7 7 7-7"
                                                />
                                            </svg>
                                            <span className="text-lg font-semibold">{item.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
