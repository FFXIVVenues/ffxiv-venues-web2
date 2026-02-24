export function useEnv(key: string) : string|undefined {
  return import.meta.env[`VITE_${key}`]
}