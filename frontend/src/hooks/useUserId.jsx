import { useEffect, useState } from 'react'

export const useUserId = () => {
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const cookies = document.cookie.split(';')
        const found = cookies.find(cookie => cookie.trim().startsWith('userId='))

        if (found) {
            const id = found.split('=')[1]
            setUserId(id)
        } else {
            const newId = crypto.randomUUID()
            document.cookie = `userId=${newId}; path=/; max-age=31536000`

            setUserId(newId)
        }
    }, [])

    return userId
}