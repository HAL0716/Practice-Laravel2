import { useEffect, useRef } from 'react';

export default function Modal({ open, onClose, title, children }) {
    const modalRef = useRef(null);

    useEffect(() => {
        if (open) {
            modalRef.current?.focus();
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;

        const handler = (e) => {
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
            onClick={onClose}
        >
            <div
                ref={modalRef}
                tabIndex={-1}
                role='dialog'
                aria-modal='true'
                aria-labelledby='modal-title'
                className='relative w-full max-w-md rounded-xl bg-white p-6 shadow-lg'
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    aria-label='Close modal'
                    className='absolute top-4 right-4'
                >
                    ×
                </button>

                {title && (
                    <h2 id='modal-title' className='mb-4 text-xl font-bold'>
                        {title}
                    </h2>
                )}

                {children}
            </div>
        </div>
    );
}
