import { useForm } from '@inertiajs/react';
import InputField from './components/InputField';
import AuthCard from './components/AuthCard';

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
        <AuthCard title='Login' link={{ href: '/register', label: 'Register' }}>
            {errors.status && (
                <div className='mb-4 text-center text-sm text-red-500'>{errors.status}</div>
            )}

            <form onSubmit={submit} className='flex flex-col gap-4'>
                <InputField
                    label='Email'
                    type='email'
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                    autoComplete='email'
                />

                <InputField
                    label='Password'
                    type='password'
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                    autoComplete='current-password'
                />

                <button
                    disabled={processing}
                    className='rounded-lg bg-blue-500 py-2 text-white transition hover:bg-blue-600 disabled:opacity-50'
                >
                    Login
                </button>
            </form>
        </AuthCard>
    );
}
