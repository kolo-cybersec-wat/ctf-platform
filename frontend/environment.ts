const isDev = import.meta.env.DEV;

declare global {
    namespace window {
        const __environment__: {
            BACKEND_URL: string
        }
    }
}

export const devEnvironment = {
    BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
}

export const prodEnvironment = {
    BACKEND_URL: window.__environment__.BACKEND_URL,
}

export const environment = isDev ? devEnvironment : prodEnvironment