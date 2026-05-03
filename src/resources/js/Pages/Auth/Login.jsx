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
        <div>
            {errors.status && <div style={{ color: 'red' }}>{errors.status}</div>}

            <form onSubmit={submit} className='flex flex-col gap-4'>
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

                <button className='border'>Login</button>
            </form>
        </div>
    );
}
