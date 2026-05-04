import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Button from '../Components/UI/Button';
import PostForm from '../Components/Post/PostForm';

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
            {/* 新規投稿 */}
            <div className='space-y-4'>
                <h2 className='font-semibold'>新規投稿</h2>

                <div className='rounded-lg border p-4'>
                    <PostForm
                        value={createForm.data.body}
                        onChange={(val) => createForm.setData('body', val)}
                        onSubmit={submit}
                        processing={createForm.processing}
                        mode='create'
                    />
                </div>
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
                            {!isEditing ? (
                                <>
                                    <div className='flex gap-2'>
                                        <small className='text-gray-500'>
                                            {post.user ? post.user.name : '削除済みユーザー'}
                                        </small>
                                        <small className='text-gray-400'>
                                            {new Date(post.updated_at).toLocaleString('ja-JP', {
                                                timeZone: 'Asia/Tokyo',
                                            })}

                                            {post.created_at !== post.updated_at && '（編集済み）'}
                                        </small>
                                    </div>

                                    <p>{post.body}</p>

                                    {isOwner && (
                                        <div className='flex gap-2'>
                                            <Button onClick={() => startEdit(post)} variant='text'>
                                                編集
                                            </Button>

                                            <Button
                                                onClick={() => destroy(post.id)}
                                                className='text-red-500 hover:underline'
                                                variant='text'
                                            >
                                                削除
                                            </Button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <PostForm
                                    value={editForm.data.body}
                                    onChange={(val) => editForm.setData('body', val)}
                                    onSubmit={(e) => update(e, post.id)}
                                    processing={editForm.processing}
                                    mode='edit'
                                    onCancel={cancelEdit}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
