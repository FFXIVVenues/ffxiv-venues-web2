export function useConfig(key: string) : string|undefined {
  return import.meta.env[`VITE_${key}`]
}