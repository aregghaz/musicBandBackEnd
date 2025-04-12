import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-[#1e242b] pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 text-[#ff5252]" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-[#2a2f37] px-6 py-4 shadow-lg sm:max-w-md sm:rounded-lg border border-[#3a3f46]">
                {children}
            </div>
        </div>
    );
}
