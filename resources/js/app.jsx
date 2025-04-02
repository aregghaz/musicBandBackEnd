import '../css/app.css';
import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { ZiggyVue } from 'ziggy';
import { Ziggy } from './ziggy';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const page = resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx')
        );

        page.then((module) => {
            module.default.ziggy = (routeName, params = {}, absolute = true) => {
                const locale = document.documentElement.lang || 'en';
                return ZiggyVue.route(routeName, { locale, ...params }, absolute, Ziggy);
            };
            return module;
        });

        return page;
    },
    setup({ el, App, props }) {
        const locale = document.documentElement.lang || 'en';
        props.initialPage.props.locale = locale; // Ensure locale is available globally

        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
