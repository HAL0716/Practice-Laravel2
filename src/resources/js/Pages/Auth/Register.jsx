import { useForm } from '@inertiajs/react';
import Button from '../Components/UI/Button';
import InputField from '../Components/UI/InputField';
import Toast from '../Components/UI/Toast';

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
            {errors.status && <Toast type='error'>{errors.status}</Toast>}

            {/* フォーム */}
            <form onSubmit={submit} className='space-y-5'>
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

                {/* ボタン */}
                <Button type='submit' className='w-full' disabled={processing}>
                    Register
                </Button>
            </form>
        </div>
    );
}
