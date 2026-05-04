import { useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post('/register');
    };

    return (
        <div className='w-full max-w-md'>
            {/* タイトル */}
            <h1 className='mb-8 text-center text-3xl font-bold text-gray-800'>Register</h1>

            {/* エラー */}
            {errors.status && (
                <div className='mb-4 rounded-md bg-red-50 p-3 text-center text-sm text-red-600'>
                    {errors.status}
                </div>
            )}

            {/* フォーム */}
            <form onSubmit={submit} className='space-y-5'>
                {/* Name */}
                <div>
                    <label htmlFor='name' className='mb-1 block text-sm font-medium text-gray-700'>
                        Name
                    </label>
                    <input
                        id='name'
                        type='text'
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        autoComplete='name'
                        className={`w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition outline-none ${
                            errors.name
                                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                        }`}
                    />
                    {errors.name && <p className='mt-1 text-xs text-red-500'>{errors.name}</p>}
                </div>

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
                        autoComplete='new-password'
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

                {/* Confirm Password */}
                <div>
                    <label
                        htmlFor='password_confirmation'
                        className='mb-1 block text-sm font-medium text-gray-700'
                    >
                        Confirm Password
                    </label>
                    <input
                        id='password_confirmation'
                        type='password'
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        autoComplete='new-password'
                        className={`w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition outline-none ${
                            errors.password_confirmation
                                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                                : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                        }`}
                    />
                    {errors.password_confirmation && (
                        <p className='mt-1 text-xs text-red-500'>{errors.password_confirmation}</p>
                    )}
                </div>

                {/* ボタン */}
                <button
                    disabled={processing}
                    className='w-full rounded-lg bg-green-500 py-2 font-medium text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50'
                >
                    Register
                </button>
            </form>
        </div>
    );
}
