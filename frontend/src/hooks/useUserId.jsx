import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export const useUserId = () => {
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const cookies = document.cookie.split(';')
        const found = cookies.find(cookie => cookie.trim().startsWith('userId='))

        if (found) {
            const id = found.split('=')[1]
            setUserId(id)
        } else {
            const newId = uuidv4()
            document.cookie = `userId=${newId}; path=/; max-age=31536000; SameSite=Lax`

            setUserId(newId)
        }
    }, [])

    return userId
}