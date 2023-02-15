/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            include: '**/*.tsx',
        }),
        tsconfigPaths(),
        VitePWA({
            registerType: 'prompt',
            injectRegister: 'auto',
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
            },
            includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
            manifest: {
                name: 'STL App',
                short_name: 'STLApp',
                description: 'Ứng dụng cho phép quản lý những thông tin cá nhân như Quản lý chi tiêu, ghi nợ,...',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: 'pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                ],
            },

            devOptions: {
                enabled: true,
            },
        }),
    ],
    test: {
        environment: 'jsdom',
        setupFiles: ['/src/setupTests.ts'],
    },
})
