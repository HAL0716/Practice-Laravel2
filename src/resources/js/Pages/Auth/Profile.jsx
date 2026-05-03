import { useForm, router } from '@inertiajs/react';

export default function Profile({ user }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch('/profile');
    };

    const logout = () => {
        router.post('/logout');
    };

    return (
        <div>
            <form onSubmit={submit} className='flex flex-col gap-4'>
                <input
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder='Name'
                />
                {errors.name && <div>{errors.name}</div>}

                <input
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder='Email'
                />
                {errors.email && <div>{errors.email}</div>}

                <input
                    type='password'
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    placeholder='Password'
                />
                {errors.password && <div>{errors.password}</div>}

                <input
                    type='password'
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    placeholder='Confirm Password'
                />

                <button disabled={processing}>Update</button>
            </form>

            <button onClick={logout}>Logout</button>
        </div>
    );
}
