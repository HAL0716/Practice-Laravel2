import { useForm } from '@inertiajs/react';

export default function Index({ posts }) {
    const { data, setData, post, processing, reset } = useForm({
        body: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/posts', {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className='flex flex-col gap-4'>
            <h1>掲示板</h1>

            <hr />

            <div>
                <h2>新規投稿</h2>
                <form onSubmit={submit} className='flex flex-col gap-4'>
                    <textarea
                        value={data.body}
                        onChange={(e) => setData('body', e.target.value)}
                        placeholder='投稿内容'
                    />
                    <button type='submit' disabled={processing}>
                        投稿
                    </button>
                </form>
            </div>

            <hr />

            <div>
                <h2>投稿一覧</h2>
                <div className='flex flex-col gap-4'>
                    {posts.map((post) => (
                        <div key={post.id}>
                            <small>{post.user ? post.user.name : '削除済みユーザー'}</small>
                            <p>{post.body}</p>
                            <small>{post.created_at}</small>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
