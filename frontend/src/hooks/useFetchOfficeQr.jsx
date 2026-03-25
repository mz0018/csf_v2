import { useState, useEffect } from 'react'
import { api } from '../services/api'

export const useFetchOffice = () => {
    const [isLoading, setIsLoading] = useState(false)
    // const [hasError, sethasError] = useState()
    const [list, setList] = useState([])

    const fetch = async () => {
        setIsLoading(true)
        try {
            const response = await api.get('/qrOffices')
            setList(response.data.images)
            const images = response.data.images

        } catch (err) {
            console.error('Something went wrong: ', err)
            debugger;
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetch()
    }, [])

    return { isLoading, list }
}