import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="bg-[#1e242b] p-8 rounded-lg shadow-md max-w-md mx-auto text-white">
                {status && (
                    <div className="mb-4 text-sm font-medium text-green-500">
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="email" value="Email" className="text-white" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full bg-[#2a2f37] text-white placeholder-gray-400 border border-[#444] rounded-md focus:outline-none focus:ring-2"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2 text-red-400" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" className="text-white" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full bg-[#2a2f37] text-white placeholder-gray-400 border border-[#444] rounded-md focus:outline-none"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2 text-red-400" />
                    </div>

                    <div className="mt-4 block">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                            />
                            <span className="ms-2 text-sm text-gray-300">
                                Remember me
                            </span>
                        </label>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-[#ff5252] hover:text-[#ff6161] underline transition"
                            >
                                Forgot your password?
                            </Link>
                        )}

                        <PrimaryButton
                            className="bg-[#ff5252] hover:bg-[#ff6161] text-white"
                            disabled={processing}
                        >
                            Log in
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
