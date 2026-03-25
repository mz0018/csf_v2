import { useState, useEffect } from 'react'
import { api } from '../services/api'

export const useFetchOffice = ({ setIsGenerated, isGenerated }) => {
    const [isLoading, setIsLoading] = useState(false)
    // const [hasError, sethasError] = useState()
    const [message, setMessage] = useState(null)
    const [list, setList] = useState([])

    const fetch = async () => {
        setIsLoading(true)
        try {
            const response = await api.get('/qrOffices')
            setMessage(response.data.message)
            setList(response.data.images)

            if (response.data.images.length > 0) {
                setIsGenerated(true)
            }
        } catch (err) {
            console.error('Something went wrong: ', err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetch()
    }, [isGenerated])

    return { isLoading, list, message }
}