import Button from '../UI/Button';
import Toast from '../UI/Toast';

export default function AuthForm({
    title,
    onSubmit,
    processing,
    buttonLabel,
    error,
    children,
}) {
    return (
        <div className='w-full max-w-md'>
            <h1 className='mb-8 text-center text-3xl font-bold text-gray-800'>{title}</h1>

            {error && <Toast type='error'>{error}</Toast>}

            <form onSubmit={onSubmit} className='space-y-5'>
                {children}

                <Button type='submit' className='w-full' disabled={processing}>
                    {buttonLabel}
                </Button>
            </form>
        </div>
    );
}
