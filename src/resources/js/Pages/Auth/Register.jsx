import { useForm } from '@inertiajs/react';
import AuthForm from '../Components/Auth/AuthForm';
import InputField from '../Components/UI/InputField';

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
        <AuthForm
            title='Register'
            onSubmit={submit}
            processing={processing}
            buttonLabel='Register'
            error={errors.status}
        >
            {/* Name */}
            <InputField
                id='name'
                label='Name'
                type='text'
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                error={errors.name}
                autoComplete='name'
            />

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
                autoComplete='new-password'
            />

            {/* Confirm Password */}
            <InputField
                id='password_confirmation'
                label='Confirm Password'
                type='password'
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                error={errors.password_confirmation}
                autoComplete='new-password'
            />
        </AuthForm>
    );
}
