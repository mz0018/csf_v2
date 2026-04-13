import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../services/api'
export const useCheckFeedbackStatus = () => {

    const { office } = useParams()
    const [alreadySubmitted, setAlreadySubmitted] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const response = await api.get(`/feedback-status/${office}`)
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
    }, [office])
    
    return { alreadySubmitted, loading }
}