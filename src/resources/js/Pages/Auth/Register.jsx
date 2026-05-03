import { useForm } from '@inertiajs/react';
import InputField from './components/InputField';
import AuthCard from './components/AuthCard';

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
        <AuthCard title='Register' link={{ href: '/login', label: 'Log in' }}>
            <form onSubmit={submit} className='flex flex-col gap-4'>
                <InputField
                    label='Name'
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    error={errors.name}
                    autoComplete='name'
                />

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
                    autoComplete='new-password'
                />

                <InputField
                    label='Confirm Password'
                    type='password'
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    error={errors.password}
                    autoComplete='new-password'
                />

                <button
                    disabled={processing}
                    className='rounded-lg bg-green-500 py-2 text-white transition hover:bg-green-600 disabled:opacity-50'
                >
                    Register
                </button>
            </form>
        </AuthCard>
    );
}
