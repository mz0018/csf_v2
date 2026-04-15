import { useEffect, useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { ClientFormUI } from '../ui/ClientFormUI'
import { api } from '../../services/api'

const SuccessFeedback = () => {
    const { office } = useParams()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    
    const [officeName, setOfficeName] = useState('')
    const [isValid, setIsValid] = useState(null)
    useEffect(() => {
        const verifyAndFetch = async () => {
            try {
                const service = searchParams.get('service')
                const statusRes = service 
                    ? await api.get(`/feedback-status/${office}?service=${encodeURIComponent(service)}`)
                    : await api.get(`/feedback-status/${office}`)
                
                if (!statusRes.data.alreadySubmitted) {
                    navigate(`/client/feedback/${office}`)
                    return
                }

                const officeRes = await api.get(`/office/${office}`)
                setOfficeName(officeRes.data.name)
                setIsValid(true)
            } catch (err) {
                console.error(err)
                navigate(`/client/feedback/${office}`)
            }
        }
        
        if (office) {
            verifyAndFetch()
        }
    }, [office, navigate])
    if (isValid === null) return null
    return (
        <ClientFormUI>
            <h2>Thank you for your feedback, {officeName} appreciates it!</h2>
            <p>You have already submitted your feedback.</p>
        </ClientFormUI>
    )
}

export default SuccessFeedback
