import { useState, useEffect } from "react"

// Generic type T allows this hook to be used with any data type
function useFetch<T>(url: string | null) {
    // State to hold the fetched data of type T or null initially
    const [ data, setData ] = useState<T | null>(null)
    // Loading state to track if the request is in progress
    const [ loading, setLoading ] = useState<boolean>(false)
    // Error state to capture any error message during fetch
    const [ error, setError ] = useState<string | null>(null)

    useEffect(() => {
        // If no URL is provided, reset state and do nothing
        if (!url) {
            setData(null)
            setError(null)
            setLoading(false)
            return
        }

        // Declare an abort controller to cancel fetch if component unmounts
        const controller = new AbortController()

        async function fetchData() {
            setLoading(true)
            setError(null)

            try {
                const response = await fetch(url, { signal: controller.signal })
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`)
                }
                const json = (await response.json()) as T
                setData(json)
            } catch (err) {
                if (err instanceof DOMException && err.name === 'AbortError') {
                    // Fetch aborted, do nothing
                    return
                } else if (err instanceof Error) {
                    setError(err.message)
                } else {
                    setError('Unknown error occurred')
                }
            } finally {
                setLoading(false)
            }
        }

        fetchData()

        // Cleanup function to abort fetch on component unmount or url change
        return () => {
            controller.abort()
        }
    }, [url])

    // Return the data, loading, and error state so components can use them
    return { data, loading, error }
}

export default useFetch