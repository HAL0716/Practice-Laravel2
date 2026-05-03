import { useForm, router } from '@inertiajs/react';
import InputField from './components/InputField';
import AuthCard from './components/AuthCard';
import { useState } from 'react';

export default function Profile({ user }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
    });

    const [message, setMessage] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        patch('/profile', {
            onSuccess: () => {
                setMessage('アップデートが成功しました。');
                setTimeout(() => {
                    setMessage(null);
                }, 2000);
            },
        });
    };

    const logout = () => {
        if (confirm('ログアウトしますか？')) {
            router.post('/logout');
        }
    };

    return (
        <AuthCard title='Profile'>
            {message && (
                <div className='mb-4 rounded-lg bg-green-100 p-4 text-green-700'>{message}</div>
            )}

            <form onSubmit={submit} className='flex flex-col gap-4'>
                <InputField
                    label='Name'
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    error={errors.name}
                />

                <InputField
                    label='Email'
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                />

                <InputField
                    label='New Password'
                    type='password'
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                />

                <InputField
                    label='Confirm Password'
                    type='password'
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    error={errors.password}
                />

                <button
                    disabled={processing}
                    className='rounded-lg bg-blue-500 py-2 text-white transition hover:bg-blue-600 disabled:opacity-50'
                >
                    Update
                </button>
            </form>

            <div className='mt-6 border-t pt-4'>
                <button
                    onClick={logout}
                    className='w-full rounded-lg bg-red-500 py-2 text-white transition hover:bg-red-600'
                >
                    Log out
                </button>
            </div>
        </AuthCard>
    );
}
