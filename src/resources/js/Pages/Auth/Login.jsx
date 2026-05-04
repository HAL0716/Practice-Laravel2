import { useForm } from '@inertiajs/react';

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
                <div>
                    <label htmlFor='email' className='mb-1 block text-sm font-medium text-gray-700'>
                        Email
                    </label>
                    <input
                        id='email'
                        type='email'
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        autoComplete='email'
                        className={`w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition outline-none ${
                            errors.email
                                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                        }`}
                    />
                    {errors.email && <p className='mt-1 text-xs text-red-500'>{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                    <label
                        htmlFor='password'
                        className='mb-1 block text-sm font-medium text-gray-700'
                    >
                        Password
                    </label>
                    <input
                        id='password'
                        type='password'
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        autoComplete='current-password'
                        className={`w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition outline-none ${
                            errors.password
                                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                        }`}
                    />
                    {errors.password && (
                        <p className='mt-1 text-xs text-red-500'>{errors.password}</p>
                    )}
                </div>

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
