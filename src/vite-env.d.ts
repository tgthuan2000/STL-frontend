/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
    readonly VITE_PROJECT_ID: string
    readonly VITE_API_TOKEN: string
    readonly VITE_BACKEND: string
    readonly VITE_VERSION_API: string
    readonly VITE_GOOGLE_CLIENT_ID: string
    readonly VITE_EMAIL_SERVICE: string
    readonly VITE_APP_URL: string
    readonly VITE_SERVER_PUBLIC_KEY: string
    readonly VITE_SERVER: string
    readonly VITE_WATCH_CACHE_MODE: string
}
interface ImportMeta {
    readonly env: ImportMetaEnv
}
