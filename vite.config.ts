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
            strategies: 'injectManifest',
            srcDir: 'src',
            filename: 'sw.ts',
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,wav}'],
                globDirectory: 'dist',
                swDest: 'dist/sw.js',
                skipWaiting: true,
                clientsClaim: true,
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/fonts\.googleapis\.com/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'google-fonts-stylesheets',
                            // Only cache 10 stylesheets.
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365,
                                // Automatically cleanup if quota is exceeded.
                                purgeOnQuotaError: true,
                            },
                        },
                    },
                    {
                        urlPattern: /^https:\/\/fonts\.gstatic\.com/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'google-fonts-webfonts',
                            expiration: {
                                maxAgeSeconds: 60 * 60 * 24 * 365,
                                purgeOnQuotaError: true,
                            },
                        },
                    },
                ],
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
                type: 'module',
            },
        }),
    ],
    test: {
        environment: 'jsdom',
        setupFiles: ['/src/setupTests.ts'],
    },
})
