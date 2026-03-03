/**
 * Centralized app configuration.
 * Reads from environment variables with sensible defaults.
 */

export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'Funil OS',
  version: import.meta.env.VITE_APP_VERSION || '0.0.55',
  env: import.meta.env.VITE_APP_ENV || 'development',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,

  api: {
    url: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
  },

  auth: {
    provider: import.meta.env.VITE_AUTH_PROVIDER || 'none',
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
    supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  },

  features: {
    darkMode: import.meta.env.VITE_ENABLE_DARK_MODE === 'true',
    collaboration: import.meta.env.VITE_ENABLE_COLLABORATION === 'true',
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  },

  storage: {
    prefix: 'funilos_',
  },
} as const

export type AppConfig = typeof APP_CONFIG
