/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PROJECT_ID: string
    readonly VITE_API_TOKEN: string
    readonly VITE_BACKEND: string
    readonly VITE_VERSION_API: string
    readonly VITE_GOOGLE_CLIENT_ID: string
    readonly VITE_EMAIL_SERVICE: string
    readonly VITE_APP_URL: string
    readonly VITE_EMAIL_PUBLIC_KEY: string
    readonly VITE_VERSION_APP: string
    readonly VITE_VERSION_RELEASE_DATE: string
}
interface ImportMeta {
    readonly env: ImportMetaEnv
}
