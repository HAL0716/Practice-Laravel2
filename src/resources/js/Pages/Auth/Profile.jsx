import { router } from '@inertiajs/react';

export default function Profile({ user }) {
    const logout = () => {
        router.post('/logout');
    };

    return (
        <div>
            <h1>Profile</h1>

            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>

            <button onClick={logout} className='border'>
                Logout
            </button>
        </div>
    );
}
