import Button from '../UI/Button';

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
            <label htmlFor='body' className='mb-1 block text-sm font-medium text-gray-700'>
                投稿内容
            </label>
            <textarea
                id='body'
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className='w-full rounded border p-2 text-sm'
            />

            <div className='flex gap-2'>
                <Button type='submit' disabled={processing}>
                    {isCreate ? '投稿' : '更新'}
                </Button>

                {onCancel && (
                    <Button onClick={onCancel} variant='secondary'>
                        キャンセル
                    </Button>
                )}
            </div>
        </form>
    );
}
