import { useSyncExternalStore } from 'react'
import { APP_CONFIG } from '@/config/app'

type SetStateAction<T> = T | ((prev: T) => T)
type Listener = () => void

interface StoreOptions<T> {
  /** Version for migration support */
  version?: number
  /** Migrate from old version to new */
  migrate?: (persisted: unknown, version: number) => T
  /** Disable localStorage persistence */
  ephemeral?: boolean
}

export function createStore<T>(name: string, initialValue: T, options: StoreOptions<T> = {}) {
  const storageKey = `${APP_CONFIG.storage.prefix}${name}`
  const { version = 1, migrate, ephemeral = false } = options
  let state = initialValue

  // Hydrate from localStorage
  if (!ephemeral) {
    try {
      if (typeof window !== 'undefined') {
        const raw = window.localStorage.getItem(storageKey)
        if (raw) {
          const envelope = JSON.parse(raw)

          // Support versioned storage
          if (envelope && typeof envelope === 'object' && '__v' in envelope) {
            const storedVersion = envelope.__v as number
            const storedData = envelope.__d

            if (storedVersion === version) {
              state = storedData
            } else if (migrate) {
              state = migrate(storedData, storedVersion)
            } else {
              // Version mismatch, no migration — use initial value
              state = initialValue
            }
          } else {
            // Legacy data (no version envelope) — try to use directly
            const parsed = envelope
            if (Array.isArray(initialValue) && !Array.isArray(parsed)) {
              state = initialValue
            } else {
              state = parsed
            }
          }
        }
      }
    } catch (err) {
      if (APP_CONFIG.isDev) {
        console.error(`[Store:${name}] Hydration failed:`, err)
      }
      state = initialValue
    }
  }

  const listeners = new Set<Listener>()

  const subscribe = (listener: Listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  const getSnapshot = () => state

  const setState = (newValue: SetStateAction<T>) => {
    const prev = state
    state = typeof newValue === 'function' ? (newValue as (prev: T) => T)(state) : newValue

    // Persist to localStorage
    if (!ephemeral) {
      try {
        if (typeof window !== 'undefined') {
          const envelope = { __v: version, __d: state }
          window.localStorage.setItem(storageKey, JSON.stringify(envelope))
        }
      } catch (err) {
        if (APP_CONFIG.isDev) {
          console.error(`[Store:${name}] Persist failed:`, err)
        }
      }
    }

    // Notify subscribers
    listeners.forEach((listener) => listener())

    // Dev tools logging
    if (APP_CONFIG.isDev && typeof window !== 'undefined') {
      ;(window as any).__FUNILOS_STORES__ = (window as any).__FUNILOS_STORES__ || {}
      ;(window as any).__FUNILOS_STORES__[name] = state
    }
  }

  /** Reset store to initial value and clear persisted data */
  const reset = () => {
    setState(initialValue)
    if (!ephemeral && typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(storageKey)
      } catch {}
    }
  }

  function useStore(): [T, typeof setState]
  function useStore<U>(selector: (state: T) => U): U
  function useStore<U>(selector?: (state: T) => U) {
    const snapshot = useSyncExternalStore(subscribe, getSnapshot)
    if (selector) {
      return selector(snapshot) as U
    }
    return [snapshot, setState] as any
  }

  // Attach utilities to the hook
  useStore.getState = getSnapshot
  useStore.setState = setState
  useStore.reset = reset
  useStore.subscribe = subscribe

  return useStore
}
