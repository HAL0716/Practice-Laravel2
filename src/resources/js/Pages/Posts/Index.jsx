import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import PostCard from '../Components/Post/PostCard';

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

            <PostCard
                mode='create'
                data={createForm.data}
                setData={createForm.setData}
                onSubmit={submit}
                processing={createForm.processing}
            />

            <hr />

            <div>
                <h2>投稿一覧</h2>
                <div className='flex flex-col gap-4'>
                    {posts.map((post) => {
                        const isOwner = auth.user && post.user_id === auth.user.id;

                        return (
                            <PostCard
                                key={post.id}
                                mode={editingId === post.id ? 'edit' : 'view'}
                                post={post}
                                data={editForm.data}
                                setData={editForm.setData}
                                processing={editForm.processing}
                                isOwner={isOwner}
                                onSubmit={(e) => update(e, post.id)}
                                onEdit={() => startEdit(post)}
                                onDelete={() => destroy(post.id)}
                                onCancel={cancelEdit}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
