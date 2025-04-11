import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
                                                     mustVerifyEmail,
                                                     status,
                                                     className = '',
                                                 }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-[#a6a6a6]">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-[#a6a6a6]">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                {/* Name Input */}
                <div>
                    <InputLabel htmlFor="name" value="Name" className="text-[#a6a6a6]" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full  text-white border-[#484a4d] focus:ring-2 focus:ring-[#ff5252] focus:border-[#ff5252]"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2 text-[#ff5252]" message={errors.name} />
                </div>

                {/* Email Input */}
                <div>
                    <InputLabel htmlFor="email" value="Email" className="text-[#a6a6a6]" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full text-white border-[#484a4d] focus:ring-2 focus:ring-[#ff5252] focus:border-[#ff5252]"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2 text-[#ff5252]" message={errors.email} />
                </div>

                {/* Email Verification */}
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-[#a6a6a6]">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-[#a6a6a6] underline hover:text-[#ff5252] focus:outline-none focus:ring-2 focus:ring-[#ff5252] focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-[#6ee7b7]">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                {/* Save Button & Success Message */}
                <div className="flex items-center gap-4">
                    <PrimaryButton
                        disabled={processing}
                        className="text-white border !border-[#ff5252]"
                    >
                        Save
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-[#a6a6a6]">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
