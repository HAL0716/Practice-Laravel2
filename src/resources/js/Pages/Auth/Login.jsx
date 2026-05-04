import { useForm } from '@inertiajs/react';
import AuthForm from '../Components/Auth/AuthForm';
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
        <AuthForm
            title='Login'
            onSubmit={submit}
            processing={processing}
            buttonLabel='Login'
            error={errors.status}
        >
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
        </AuthForm>
    );
}
