export default function Modal({ open, onClose, title, children }) {
    if (!open) return null;

    return (
        <div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
            onClick={onClose}
        >
            <div
                className='w-full max-w-md rounded-xl bg-white p-6 shadow-lg'
                onClick={(e) => e.stopPropagation()}
            >
                {title && <h2 className='mb-4 text-xl font-bold'>{title}</h2>}

                {children}
            </div>
        </div>
    );
}
