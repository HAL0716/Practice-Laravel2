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
        <form onSubmit={submit} className='flex flex-col gap-4'>
            <div>
                <input
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder='Name'
                />
                {errors.name && <div className='text-red-500'>{errors.name}</div>}
            </div>

            <div>
                <input
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder='Email'
                />
                {errors.email && <div className='text-red-500'>{errors.email}</div>}
            </div>

            <div>
                <input
                    type='password'
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    placeholder='Password'
                />
                {errors.password && <div className='text-red-500'>{errors.password}</div>}
            </div>

            <div>
                <input
                    type='password'
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    placeholder='Confirm Password'
                />
                {errors.password_confirmation && (
                    <div className='text-red-500'>{errors.password_confirmation}</div>
                )}
            </div>

            <button disabled={processing} className='border'>
                Register
            </button>
        </form>
    );
}
