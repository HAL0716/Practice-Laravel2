export default function PostCard({
    mode = 'view',
    post,
    data,
    setData,
    onSubmit,
    onEdit,
    onDelete,
    onCancel,
    processing,
    isOwner,
}) {
    const formatDate = (date) =>
        new Date(date).toLocaleString('ja-JP', {
            timeZone: 'Asia/Tokyo',
        });

    return (
        <div className='flex flex-col gap-2 rounded border p-4 shadow'>
            {mode !== 'create' && <small>{post.user ? post.user.name : '削除済みユーザー'}</small>}

            {mode === 'view' && (
                <>
                    <p>{post.body}</p>
                    <small>
                        {formatDate(post.updated_at)}{' '}
                        {post.created_at !== post.updated_at && `編集済み`}
                    </small>

                    {isOwner && (
                        <div className='flex gap-2'>
                            <button onClick={onEdit}>編集</button>
                            <button onClick={onDelete}>削除</button>
                        </div>
                    )}
                </>
            )}

            {(mode === 'create' || mode === 'edit') && (
                <form onSubmit={onSubmit} className='flex flex-col gap-2'>
                    <textarea
                        value={data.body}
                        onChange={(e) => setData('body', e.target.value)}
                        placeholder='投稿内容'
                    />

                    <div className='flex gap-2'>
                        <button type='submit' disabled={processing}>
                            {mode === 'create' ? '投稿' : '更新'}
                        </button>

                        {mode === 'edit' && (
                            <button type='button' onClick={onCancel}>
                                キャンセル
                            </button>
                        )}
                    </div>
                </form>
            )}
        </div>
    );
}
