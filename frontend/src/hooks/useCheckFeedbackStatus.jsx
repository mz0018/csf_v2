import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../services/api'

export const useCheckFeedbackStatus = (selectedService) => {
    const { office } = useParams()
    const [alreadySubmitted, setAlreadySubmitted] = useState(false)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const checkStatus = async () => {
            try {
                const url = selectedService 
                    ? `/feedback-status/${office}?service=${encodeURIComponent(selectedService)}`
                    : `/feedback-status/${office}`
                const response = await api.get(url)
                setAlreadySubmitted(response.data.alreadySubmitted)
            } catch (err) {
                console.error('Error checking status:', err)
            } finally {
                setLoading(false)
            }
        }
        if (office) {
            checkStatus()
        }
    }, [office, selectedService])
    
    return { alreadySubmitted, loading }
}