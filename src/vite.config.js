import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import inertia from '@inertiajs/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.jsx'],
                refresh: true,
            }),
            inertia(),
            tailwindcss(),
        ],
        server: {
            host: env.VITE_HOST || '0.0.0.0',
            port: env.VITE_PORT ? Number(env.VITE_PORT) : 5173,
            hmr: {
                host: env.VITE_HMR_HOST || 'localhost',
            },
            watch: {
                ignored: ['**/storage/framework/views/**'],
            },
        },
    };
});
