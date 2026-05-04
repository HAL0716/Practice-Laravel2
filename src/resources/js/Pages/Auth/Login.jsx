import { useForm } from '@inertiajs/react';
import Button from '../Components/UI/Button';
import InputField from '../Components/UI/InputField';
import Toast from '../Components/UI/Toast';

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
            {errors.status && <Toast type='error'>{errors.status}</Toast>}

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
                <Button type='submit' className='w-full' disabled={processing}>
                    Login
                </Button>
            </form>
        </div>
    );
}
