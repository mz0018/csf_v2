import { useEffect, useState } from 'react'

export const useLocalStorage = (key, defaultValue) => {
    const [state, setState] = useState(() => {
        try {
            const stored = localStorage.getItem(key)
            return stored ? JSON.parse(stored) : defaultValue
        } catch (err) {
            console.error(err)
            return defaultValue
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(state))
        } catch (err) {
            console.error(err)
        }
    }, [key, state])

    return [state, setState]
}