import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../services/api'

export const useFetchSpecificOffice = () => {
    const { office } = useParams()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchOfficeData = async () => {
        setLoading(true)
        try {
            const response = await api.get(`/office/${office}`)
            setData(response.data)
            console.log('DATA: ', response.data)
        } catch (err) {
            console.error('Something went wrong: ', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (office) {
            fetchOfficeData()
        }
    }, [office])

    return { loading, data }
}