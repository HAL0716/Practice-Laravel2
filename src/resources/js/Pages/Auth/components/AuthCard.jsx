import { Link } from '@inertiajs/react';

export default function AuthCard({ title, children, link }) {
    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-100'>
            <div className='relative w-full max-w-md rounded-2xl bg-white p-6 shadow-md'>
                {link && (
                    <div className='absolute top-4 right-4'>
                        <Link href={link.href} className='text-sm text-blue-500 hover:underline'>
                            {link.label}
                        </Link>
                    </div>
                )}

                <h2 className='mb-6 text-center text-2xl font-semibold'>{title}</h2>

                {children}
            </div>
        </div>
    );
}
