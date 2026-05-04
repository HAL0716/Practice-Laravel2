import { useEffect, useState } from 'react';

export default function Toast({ type = 'info', children, duration = 3000 }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (!duration) return;

        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    if (!visible) return null;

    const styles = {
        error: 'bg-red-50 text-red-600',
        success: 'bg-green-100 text-green-700',
        info: 'bg-blue-50 text-blue-700',
    };

    return (
        <div className={`mb-4 rounded-lg p-3 text-center text-sm ${styles[type]}`}>{children}</div>
    );
}
