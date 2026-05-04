import { useEffect } from 'react';

export default function Modal({ open, onClose, title, children }) {
    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose?.();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
            {/* 背景（外部クリックで閉じる） */}
            <div className='absolute inset-0 bg-black/40' onClick={onClose} />

            {/* モーダル本体 */}
            <div
                role='dialog'
                aria-modal='true'
                aria-labelledby='modal-title'
                className='relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-lg'
                onClick={(e) => e.stopPropagation()} // 内部クリックで閉じないようにする
            >
                {/* タイトル */}
                {title && <h2 className='mb-4 text-lg font-semibold text-gray-800'>{title}</h2>}

                {children}
            </div>
        </div>
    );
}
