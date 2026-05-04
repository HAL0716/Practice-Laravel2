import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ posts, auth }) {
    const createForm = useForm({
        body: '',
    });

    const submit = (e) => {
        e.preventDefault();
        createForm.post('/posts', {
            onSuccess: () => createForm.reset(),
        });
    };

    const editForm = useForm({
        body: '',
    });

    const [editingId, setEditingId] = useState(null);

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
            onSuccess: () => {
                cancelEdit();
            },
        });
    };

    const destroy = (id) => {
        if (confirm('削除しますか？')) {
            router.delete(`/posts/${id}`);
        }
    };

    const formatDate = (date) =>
        new Date(date).toLocaleString('ja-JP', {
            timeZone: 'Asia/Tokyo',
        });

    return (
        <div className='flex flex-col gap-4'>
            <h1>掲示板</h1>

            <hr />

            <div>
                <h2>新規投稿</h2>
                <form onSubmit={submit} className='flex flex-col gap-4'>
                    <textarea
                        value={createForm.data.body}
                        onChange={(e) => createForm.setData('body', e.target.value)}
                        placeholder='投稿内容'
                    />
                    <button type='submit' disabled={createForm.processing}>
                        投稿
                    </button>

                    {createForm.errors.body && (
                        <div className='text-red-500'>{createForm.errors.body}</div>
                    )}
                </form>
            </div>

            <hr />

            <div>
                <h2>投稿一覧</h2>
                <div className='flex flex-col gap-4'>
                    {posts.map((post) => (
                        <div key={post.id}>
                            <small>{post.user ? post.user.name : '削除済みユーザー'}</small>

                            {editingId === post.id ? (
                                <form
                                    onSubmit={(e) => update(e, post.id)}
                                    className='flex flex-col gap-4'
                                >
                                    <textarea
                                        value={editForm.data.body}
                                        onChange={(e) => editForm.setData('body', e.target.value)}
                                    />
                                    <button type='submit' disabled={editForm.processing}>
                                        更新
                                    </button>
                                    <button type='button' onClick={cancelEdit}>
                                        キャンセル
                                    </button>

                                    {editForm.errors.body && (
                                        <div className='text-red-500'>{editForm.errors.body}</div>
                                    )}
                                </form>
                            ) : (
                                <>
                                    <p>{post.body}</p>
                                    <small>{formatDate(post.created_at)}</small>

                                    {auth.user && post.user_id === auth.user.id && (
                                        <>
                                            <button onClick={() => startEdit(post)}>編集</button>
                                            <button onClick={() => destroy(post.id)}>削除</button>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
