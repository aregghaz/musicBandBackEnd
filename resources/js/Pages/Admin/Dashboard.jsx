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
    { label: 'Pre Sale Tours', route: 'upcoming-tour-sections.index' },
];

export default function Dashboard() {
    const { locale, auth } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-white">
                    Welcome back, {auth.user.name} 👋
                </h2>
            }
        >
            <div className="py-6 px-4 lg:px-8 bg-[#13181d] min-h-screen">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-64 bg-[#1e242b] shadow rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-4 text-white">Menu</h3>
                        <ul className="space-y-2">
                            {navItems.map((item, index) => (
                                <li key={index} className={'cursor-pointer'}>
                                    <Link
                                        href={route(item.route, { locale })}
                                        className="flex items-center p-2 rounded-md hover:bg-[#ff5252] transition cursor-pointer"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 mr-3 text-white"
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
                                        <span className="text-sm font-medium text-white cursor-pointer">{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 bg-[#1e242b] text-white shadow rounded-lg p-6">
                        <div className="mb-6">
                            <h1 className="text-xl font-semibold text-white">Dashboard Overview</h1>
                            <p className="text-sm text-[rgba(255,255,255,0.7)]">Use the menu to manage your site’s content.</p>
                        </div>

                        {/* Quick Action Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {/* Create a Blog Card */}
                            <div className="bg-[#232a32] p-4 rounded-lg shadow text-white">
                                <h2 className="text-md font-semibold mb-1">Quick Action</h2>
                                <Link
                                    href={route('blogs.create', { locale })}
                                    className="inline-block mt-2 text-sm text-[#ff5252] hover:underline cursor-pointer"
                                >
                                    ➕ Create a new blog
                                </Link>
                            </div>



                            {/* Settings Card */}
                            <div className="bg-[#232a32] p-4 rounded-lg shadow text-white">
                                <h2 className="text-md font-semibold mb-1">Settings</h2>
                                <Link
                                    href={route('settings.index', { locale })}
                                    className="inline-block mt-2 text-sm text-[#ff5252] hover:underline cursor-pointer"
                                >
                                    ⚙️ Update Site Settings
                                </Link>
                            </div>

                            {/* Band Members Management Card */}
                            <div className="bg-[#232a32] p-4 rounded-lg shadow text-white">
                                <h2 className="text-md font-semibold mb-1">Manage Band Members</h2>
                                <Link
                                    href={route('band-members.index', { locale })}
                                    className="inline-block mt-2 text-sm text-[#ff5252] hover:underline cursor-pointer"
                                >
                                    📋 View and Update Band Members
                                </Link>
                            </div>

                            {/* Albums Management Card */}
                            <div className="bg-[#232a32] p-4 rounded-lg shadow text-white">
                                <h2 className="text-md font-semibold mb-1">Manage Albums</h2>
                                <Link
                                    href={route('albums.index', { locale })}
                                    className="inline-block mt-2 text-sm text-[#ff5252] hover:underline cursor-pointer"
                                >
                                    📀 Manage Album Content
                                </Link>
                            </div>

                            {/* Sliders Management Card */}
                            <div className="bg-[#232a32] p-4 rounded-lg shadow text-white">
                                <h2 className="text-md font-semibold mb-1">Manage Sliders</h2>
                                <Link
                                    href={route('sliders.index', { locale })}
                                    className="inline-block mt-2 text-sm text-[#ff5252] hover:underline cursor-pointer"
                                >
                                    🖼️ Manage Website Sliders
                                </Link>
                            </div>

                            {/* Contact Submissions Card */}
                            <div className="bg-[#232a32] p-4 rounded-lg shadow text-white">
                                <h2 className="text-md font-semibold mb-1">Contacts</h2>
                                <Link
                                    href={route('contacts.showForm', { locale })}
                                    className="inline-block mt-2 text-sm text-[#ff5252] hover:underline cursor-pointer"
                                >
                                    📬 View Contact Submissions
                                </Link>
                            </div>

                            {/* Create New Concert Card */}
                            <div className="bg-[#232a32] p-4 rounded-lg shadow text-white">
                                <h2 className="text-md font-semibold mb-1">Create Concert</h2>
                                <Link
                                    href={route('concerts.create', { locale })}
                                    className="inline-block mt-2 text-sm text-[#ff5252] hover:underline cursor-pointer"
                                >
                                    🎤 Add New Concert Event
                                </Link>
                            </div>

                            {/* Upcoming Concerts Card */}
                            <div className="bg-[#232a32] p-4 rounded-lg shadow text-white">
                                <h2 className="text-md font-semibold mb-1">Upcoming Concerts</h2>
                                <p className="text-sm text-[rgba(255,255,255,0.7)]">
                                    Check concert dates under “Manage Concerts”.
                                </p>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
