import { useState, useEffect } from "react"

/**
 * Custom hook to synchronize a React state value with localStorage.
 * 
 * @param key The localStorage key.
 * @param initialValue The initial value or a function returning it.
 * @returns A tuple: [storedValue, setStoredValue], similar to useState but persisted.
 */
function useLocalStorage<T>(key: string, initialValue: T | (() => T)): readonly [T, React.Dispatch<React.SetStateAction<T>>] {
  // Initialize state with value from localStorage or fallback to initialValue.
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item !== null) {
        return JSON.parse(item)
      }
      // Support lazy initialization if initialValue is a function.
      return typeof initialValue === "function" ? (initialValue as () => T)() : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return typeof initialValue === "function" ? (initialValue as () => T)() : initialValue
    }
  })

  // Update localStorage whenever storedValue changes.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue] as const
}

export default useLocalStorage