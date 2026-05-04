export default function Button({
    children,
    type = 'button',
    variant = 'primary',
    className = '',
    disabled,
    ...props
}) {
    const base = 'font-medium transition disabled:opacity-50 disabled:cursor-not-allowed';

    const styles = {
        primary: 'rounded-lg px-4 py-2 text-white bg-blue-500 hover:bg-blue-600',
        danger: 'rounded-lg px-4 py-2 text-white bg-red-600 hover:bg-red-700 disabled:bg-red-400',
        gray: 'rounded-lg px-4 py-2 text-white bg-gray-700 hover:bg-gray-800',
        text: 'text-blue-500 hover:underline p-0 bg-transparent rounded-none',
    };

    return (
        <button
            type={type}
            disabled={disabled}
            {...props}
            className={[base, styles[variant], className].join(' ')}
        >
            {children}
        </button>
    );
}
