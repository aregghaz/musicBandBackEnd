import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function UpdatePasswordForm({ className = '' }) {
    const { data, setData, patch, errors, processing } = useForm({
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('password.update'));
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-[#a6a6a6]">
                    Update Password
                </h2>

                <p className="mt-1 text-sm text-[#a6a6a6]">
                    Ensure your account is using a long, random password to stay secure.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="current_password" value="Current Password" className="text-[#a6a6a6]" />

                    <TextInput
                        id="current_password"
                        type="password"
                        className="mt-1 block w-full text-white border-[#484a4d] focus:ring-2 focus:ring-[#ff5252] focus:border-[#ff5252]"
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        required
                        placeholder="Current Password"
                    />

                    <InputError className="mt-2 text-[#ff5252]" message={errors.current_password} />
                </div>

                <div>
                    <InputLabel htmlFor="new_password" value="New Password" className="text-[#a6a6a6]" />

                    <TextInput
                        id="new_password"
                        type="password"
                        className="mt-1 block w-full  text-white border-[#484a4d] focus:ring-2 focus:ring-[#ff5252] focus:border-[#ff5252]"
                        value={data.new_password}
                        onChange={(e) => setData('new_password', e.target.value)}
                        required
                        placeholder="New Password"
                    />

                    <InputError className="mt-2 text-[#ff5252]" message={errors.new_password} />
                </div>

                <div>
                    <InputLabel htmlFor="new_password_confirmation" value="Confirm New Password" className="text-[#a6a6a6]" />

                    <TextInput
                        id="new_password_confirmation"
                        type="password"
                        className="mt-1 block w-full  text-white border-[#484a4d] focus:ring-2 focus:ring-[#ff5252] focus:border-[#ff5252]"
                        value={data.new_password_confirmation}
                        onChange={(e) => setData('new_password_confirmation', e.target.value)}
                        required
                        placeholder="Confirm New Password"
                    />

                    <InputError className="mt-2 text-[#ff5252]" message={errors.new_password_confirmation} />
                </div>

                <div className="flex items-center ">
                    <PrimaryButton
                        disabled={processing}
                        className="text-white border !border-[#ff5252]"
                    >
                        Save
                    </PrimaryButton>
                </div>
            </form>
        </section>
    );
}
