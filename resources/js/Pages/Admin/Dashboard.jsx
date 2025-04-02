import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { locale } = usePage().props;

    console.log("Current locale:", locale); // ✅ Debugging locale

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
                        {/* Navigation */}
                        <nav className="p-4 hover:opacity-60 rounded-t-lg">
                            <ul className="flex space-x-6">
                                <li>
                                    <Link
                                        href={route('blogs.index', { locale })}
                                        className="flex items-center p-2 rounded-md transition duration-300"
                                    >
                                        {/* Icon */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 mr-2"
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
                                        <span>Manage Blogs</span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
