import { useForm } from '@inertiajs/react';
import InputField from '../Components/UI/InputField';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post('/login');
    };

    return (
        <div className='w-full max-w-md'>
            {/* タイトル */}
            <h1 className='mb-8 text-center text-3xl font-bold text-gray-800'>Login</h1>

            {/* エラー */}
            {errors.status && (
                <div className='mb-4 rounded-md bg-red-50 p-3 text-center text-sm text-red-600'>
                    {errors.status}
                </div>
            )}

            {/* フォーム */}
            <form onSubmit={submit} className='space-y-5'>
                {/* Email */}
                <InputField
                    id='email'
                    label='Email'
                    type='email'
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                    autoComplete='email'
                />

                {/* Password */}
                <InputField
                    id='password'
                    label='Password'
                    type='password'
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                    autoComplete='current-password'
                />

                {/* ボタン */}
                <button
                    disabled={processing}
                    className='w-full rounded-lg bg-blue-500 py-2 font-medium text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50'
                >
                    Login
                </button>
            </form>
        </div>
    );
}
