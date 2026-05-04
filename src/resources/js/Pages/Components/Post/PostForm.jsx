export default function PostForm({
    value,
    onChange,
    onSubmit,
    processing,
    mode = 'create',
    onCancel,
}) {
    const isCreate = mode === 'create';

    return (
        <form onSubmit={onSubmit} className='space-y-2'>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className='w-full rounded border p-2 text-sm'
            />

            <div className='flex gap-2'>
                <button
                    disabled={processing}
                    className={`rounded px-4 py-2 text-white transition disabled:opacity-50 ${
                        isCreate
                            ? 'bg-blue-500 hover:bg-blue-600'
                            : 'bg-green-500 hover:bg-green-600'
                    } `}
                >
                    {isCreate ? '投稿' : '更新'}
                </button>

                {onCancel && (
                    <button type='button' onClick={onCancel} className='rounded border px-3 py-2'>
                        キャンセル
                    </button>
                )}
            </div>
        </form>
    );
}
