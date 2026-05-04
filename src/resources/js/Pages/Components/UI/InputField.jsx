export default function InputField({
    id,
    label,
    type = 'text',
    value,
    onChange,
    error,
    autoComplete,
}) {
    return (
        <div>
            {label && (
                <label htmlFor={id} className='mb-1 block text-sm font-medium text-gray-700'>
                    {label}
                </label>
            )}

            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
                className={`w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition outline-none ${
                    error
                        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                }`}
            />

            {error && <p className='mt-1 text-xs text-red-500'>{error}</p>}
        </div>
    );
}
