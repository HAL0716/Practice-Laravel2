export default function InputField({
    label,
    type = 'text',
    value,
    onChange,
    error,
    placeholder,
    autoComplete,
}) {
    return (
        <div className='flex flex-col gap-1'>
            {label && <label className='text-sm text-gray-600'>{label}</label>}

            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className={`rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${error ? 'border-red-500' : 'border-gray-300'} `}
            />

            {error && <p className='text-sm text-red-500'>{error}</p>}
        </div>
    );
}
