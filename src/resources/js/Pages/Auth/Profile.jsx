import { useForm, router } from '@inertiajs/react';
import InputField from './components/InputField';
import AuthCard from './components/AuthCard';
import Modal from './components/Modal';
import { useEffect, useState, useRef } from 'react';

export default function Profile({ user }) {
    const initialRef = useRef({
        name: user.name,
        email: user.email,
    });

    const { data, setData, patch, processing, errors, reset } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
    });

    const [isDirty, setIsDirty] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const changed =
            data.name !== initialRef.current.name ||
            data.email !== initialRef.current.email ||
            data.password.length > 0 ||
            data.password_confirmation.length > 0;

        setIsDirty(changed);
    }, [data]);

    const submit = (e) => {
        e.preventDefault();
        patch('/profile', {
            onSuccess: () => {
                setMessage('アップデートが成功しました。');

                initialRef.current = {
                    name: data.name,
                    email: data.email,
                };

                reset('password', 'password_confirmation');
                setIsDirty(false);

                setTimeout(() => setMessage(null), 2000);
            },
        });
    };

    const logout = () => {
        if (confirm('ログアウトしますか？')) {
            router.post('/logout');
        }
    };

    const [deleteOpen, setDeleteOpen] = useState(false);

    const {
        data: deleteData,
        setData: setDeleteData,
        delete: destroy,
        processing: deleting,
        errors: deleteErrors,
        reset: resetDelete,
    } = useForm({
        password: '',
    });

    const submitDelete = (e) => {
        e.preventDefault();

        destroy('/profile', {
            onSuccess: () => {
                setDeleteOpen(false);
                resetDelete();
            },
        });
    };

    return (
        <AuthCard title='Profile'>
            {message && (
                <div className='mb-4 rounded-lg bg-green-100 p-4 text-green-700'>{message}</div>
            )}

            <form onSubmit={submit} className='flex flex-col gap-4'>
                <InputField
                    id='Name'
                    label='Name'
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    error={errors.name}
                    autoComplete='name'
                />

                <InputField
                    id='Email'
                    label='Email'
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                    autoComplete='email'
                />

                <InputField
                    id='NewPassword'
                    label='New Password'
                    type='password'
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                    autoComplete='new-password'
                />

                <InputField
                    id='ConfirmPassword'
                    label='Confirm Password'
                    type='password'
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    error={errors.password}
                    autoComplete='new-password'
                />

                <button
                    disabled={processing || !isDirty}
                    className='rounded-lg bg-blue-500 py-2 text-white transition hover:bg-blue-600 disabled:opacity-50'
                >
                    Update
                </button>
            </form>

            <div className='mt-6 flex gap-3 border-t pt-4'>
                <button
                    onClick={logout}
                    className='w-full rounded-lg bg-gray-700 py-2 text-white hover:bg-gray-800'
                >
                    Log out
                </button>

                <button
                    onClick={() => setDeleteOpen(true)}
                    className='w-full rounded-lg bg-red-600 py-2 text-white hover:bg-red-700'
                >
                    アカウント削除
                </button>
            </div>

            <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} title='アカウント削除'>
                <p className='mb-4 text-sm text-gray-600'>
                    この操作は取り消せません。パスワードを入力してください。
                </p>

                <form onSubmit={submitDelete} className='flex flex-col gap-3'>
                    <InputField
                        id='DeletePassword'
                        label='Password'
                        type='password'
                        value={deleteData.password}
                        onChange={(e) => setDeleteData('password', e.target.value)}
                        error={deleteErrors.password}
                        autoComplete='current-password'
                    />

                    <div className='mt-2 flex justify-end gap-2'>
                        <button
                            type='button'
                            onClick={() => setDeleteOpen(false)}
                            className='rounded-lg border px-4 py-2'
                        >
                            キャンセル
                        </button>

                        <button
                            disabled={deleting}
                            className='rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50'
                        >
                            削除する
                        </button>
                    </div>
                </form>
            </Modal>
        </AuthCard>
    );
}
