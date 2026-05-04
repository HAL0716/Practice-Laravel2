import { useForm } from '@inertiajs/react';
import { useEffect, useState, useRef } from 'react';
import InputField from '../Components/UI/InputField';
import Modal from '../Components/UI/Modal';

export default function Profile({ auth }) {
    const initialRef = useRef({
        name: auth.user?.name,
        email: auth.user?.email,
    });

    const { data, setData, patch, processing, errors, reset } = useForm({
        name: auth.user?.name,
        email: auth.user?.email,
        password: '',
        password_confirmation: '',
    });

    const [isDirty, setIsDirty] = useState(false);
    const [message, setMessage] = useState(null);

    // 削除モーダル
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
        <div className='w-full max-w-md'>
            {/* タイトル */}
            <h1 className='mb-8 text-center text-3xl font-bold text-gray-800'>Profile</h1>

            {/* 成功メッセージ */}
            {message && (
                <div className='mb-4 rounded-lg bg-green-100 p-3 text-center text-sm text-green-700'>
                    {message}
                </div>
            )}

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
                    label='New Password'
                    type='password'
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                    autoComplete='new-password'
                />

                {/* Confirm */}
                <InputField
                    id='password_confirmation'
                    label='Confirm New Password'
                    type='password'
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    error={errors.password_confirmation}
                    autoComplete='new-password'
                />

                {/* 更新 */}
                <button
                    disabled={processing || !isDirty}
                    className='w-full rounded-lg bg-blue-500 py-2 font-medium text-white transition hover:bg-blue-600 disabled:opacity-50'
                >
                    Update
                </button>
            </form>

            {/* アクション */}
            <div className='mt-6 border-t pt-4'>
                <button
                    onClick={() => setDeleteOpen(true)}
                    className='w-full rounded-lg bg-red-600 py-2 text-white hover:bg-red-700'
                >
                    アカウント削除
                </button>
            </div>

            {/* 削除モーダル */}
            <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} title='アカウント削除'>
                <p className='mb-4 text-sm text-gray-600'>
                    この操作は取り消せません。パスワードを入力してください。
                </p>

                <form onSubmit={submitDelete} className='space-y-4'>
                    <InputField
                        id='delete_password'
                        label='Password'
                        type='password'
                        value={deleteData.password}
                        onChange={(e) => setDeleteData('password', e.target.value)}
                        error={deleteErrors.password}
                        autoComplete='current-password'
                    />

                    {deleteErrors.password && (
                        <p className='text-xs text-red-500'>{deleteErrors.password}</p>
                    )}

                    <div className='flex justify-end gap-2'>
                        <button
                            type='button'
                            onClick={() => setDeleteOpen(false)}
                            className='rounded-lg border px-4 py-2'
                        >
                            キャンセル
                        </button>

                        <button
                            disabled={deleting}
                            className='rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700'
                        >
                            削除
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
