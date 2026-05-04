import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ posts, auth }) {
    const createForm = useForm({
        body: '',
    });

    const editForm = useForm({
        body: '',
    });

    const [editingId, setEditingId] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        createForm.post('/posts', {
            onSuccess: () => createForm.reset(),
        });
    };

    const startEdit = (post) => {
        setEditingId(post.id);
        editForm.setData('body', post.body);
    };

    const cancelEdit = () => {
        setEditingId(null);
        editForm.reset();
    };

    const update = (e, id) => {
        e.preventDefault();

        editForm.patch(`/posts/${id}`, {
            onSuccess: () => cancelEdit(),
        });
    };

    const destroy = (id) => {
        if (confirm('削除しますか？')) {
            router.delete(`/posts/${id}`);
        }
    };

    return (
        <div className='space-y-6'>
            <div className='space-y-4'>
                <h2 className='font-semibold'>新規投稿</h2>

                {/* 投稿フォーム */}
                <form onSubmit={submit} className='space-y-3 rounded-lg border p-4'>
                    <textarea
                        value={createForm.data.body}
                        onChange={(e) => createForm.setData('body', e.target.value)}
                        placeholder='投稿内容'
                        className='w-full rounded border p-2 text-sm'
                    />

                    <button
                        disabled={createForm.processing}
                        className='rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50'
                    >
                        投稿
                    </button>
                </form>
            </div>

            <hr />

            {/* 投稿一覧 */}
            <div className='space-y-4'>
                <h2 className='font-semibold'>投稿一覧</h2>

                {posts.map((post) => {
                    const isOwner = auth.user && post.user_id === auth.user.id;

                    const isEditing = editingId === post.id;

                    return (
                        <div key={post.id} className='space-y-3 rounded-lg border p-4'>
                            {/* ユーザー名 */}
                            <small className='text-gray-500'>
                                {post.user ? post.user.name : '削除済みユーザー'}
                            </small>

                            {/* 表示 or 編集 */}
                            {!isEditing ? (
                                <>
                                    <p className='text-gray-800'>{post.body}</p>

                                    <small className='text-gray-400'>
                                        {new Date(post.updated_at).toLocaleString('ja-JP', {
                                            timeZone: 'Asia/Tokyo',
                                        })}{' '}
                                        {post.created_at !== post.updated_at && '（編集済み）'}
                                    </small>

                                    {isOwner && (
                                        <div className='flex gap-2 pt-2'>
                                            <button
                                                onClick={() => startEdit(post)}
                                                className='text-blue-500 hover:underline'
                                            >
                                                編集
                                            </button>

                                            <button
                                                onClick={() => destroy(post.id)}
                                                className='text-red-500 hover:underline'
                                            >
                                                削除
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                /* 編集フォーム */
                                <form onSubmit={(e) => update(e, post.id)} className='space-y-2'>
                                    <textarea
                                        value={editForm.data.body}
                                        onChange={(e) => editForm.setData('body', e.target.value)}
                                        className='w-full rounded border p-2 text-sm'
                                    />

                                    <div className='flex gap-2'>
                                        <button
                                            disabled={editForm.processing}
                                            className='rounded bg-green-500 px-3 py-1 text-white'
                                        >
                                            更新
                                        </button>

                                        <button
                                            type='button'
                                            onClick={cancelEdit}
                                            className='rounded border px-3 py-1'
                                        >
                                            キャンセル
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
