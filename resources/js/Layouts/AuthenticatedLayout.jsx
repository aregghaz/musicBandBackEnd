import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react'; // Correct import
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const currentRoute = route().current(); // Use route().current() to get the current route name
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    // Handle back navigation using window.history
    const handleBack = () => {
        if (window.history.length > 1) {
            window.history.back();  // Go back to the previous page in history
        } else {
            window.location.href = '/';  // Fallback to homepage if no history
        }
    };

    return (
        <div className="min-h-screen bg-[#13181d] text-white">
            {/* Navbar */}
            <nav className="sticky top-0 z-30 bg-[#1e242b] border-b border-[#232a32] shadow-lg">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        {/* Left Side: Logo + Links */}
                        <div className="flex items-center space-x-8">
                            <Link href={route('admin.dashboard')} className="flex items-center">
                                <ApplicationLogo className="block h-9 w-auto text-white" />
                            </Link>

                            <div className="hidden sm:flex space-x-4">

                                <NavLink
                                    className="text-white hover:text-[#ff5252]"
                                    href={route('blogs.index')}
                                    active={route().current('blogs.index')}
                                >
                                    Blogs
                                </NavLink>
                                <NavLink
                                    className="text-white hover:text-[#ff5252]"
                                    href={route('concerts.index')}
                                    active={route().current('concerts.index')}
                                >
                                    Concerts
                                </NavLink>
                                <NavLink
                                    className="text-white hover:text-[#ff5252]"
                                    href={route('band-members.index')}
                                    active={route().current('band-members.index')}
                                >
                                    Band Members
                                </NavLink>
                                <NavLink
                                    className="text-white hover:text-[#ff5252]"
                                    href={route('albums.index')}
                                    active={route().current('albums.index')}
                                >
                                    Albums
                                </NavLink>
                            </div>
                        </div>

                        {/* Right Side: Dropdown */}
                        <div className="hidden sm:flex items-center space-x-4">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="inline-flex items-center rounded-md border border-transparent bg-[#232a32] px-4 py-2 text-sm font-medium text-gray-300 hover:text-[#ff5252] focus:outline-none transition">
                                        {user.name}
                                        <svg
                                            className="ml-2 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content className="bg-[#232a32] rounded-md shadow-md">
                                    <Dropdown.Link
                                        className="text-white hover:text-[#ff5252] hover:bg-[#333c44] p-2"
                                        href={route('profile.edit')}
                                    >
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        className="text-white hover:text-[#ff5252] hover:bg-[#333c44] p-2"
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Back Arrow Button */}
            {/* Render the back button only if the current route is NOT admin dashboard */}

            <div className={'flex gap-3 bg-[#232a32]'}>
                {currentRoute !== 'admin.dashboard' && (
                    <div className="bg-[#232a32] py-2 px-4">
                        <div className="max-w-7xl mx-auto flex justify-between items-center">
                            <button
                                onClick={handleBack}
                                className="bg-[#232a32] text-white rounded-full p-2 hover:bg-[#ff5252] transition"
                            >
                                <svg
                                    className="w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                {/* Header Section */}
                <header className="bg-[#232a32] shadow-lg px-4 sm:px-6 lg:px-8 py-4 w-full">
                    <div className="mx-auto">
                        {header}
                    </div>
                </header>

            </div>


            {/* Main Content */}
            <main className="py-6 px-4 sm:px-6 lg:px-8">{children}</main>
        </div>
    );
}
