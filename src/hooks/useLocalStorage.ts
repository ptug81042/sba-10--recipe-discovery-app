import { useState, useEffect } from "react"

/**
 * Custom hook to synchronize a React state value with localStorage
 * @param key The localStorage key
 * @param iniitialValue The initial value or a function returning it
 * @returns [value, setValue] tuple like useState but persisted to localStorage
 */
function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    // Get initial state from localStorage or fallback to initialValue
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key)
            // If item exists, parse JSON, else use initialValue (call if function)
            return item ? JSON.parse(item) : (typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue)
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error)
            return typeof initialValue === 'function' ? (initialValue as () => T)(): initialValue
        }
    })

    // Update localStorage whenever storedValue changes
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue))
        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error)
        }
    }, [key, storedValue])

    return [storedValue, setStoredValue] as const;
}

export default useLocalStorage