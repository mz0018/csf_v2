import { useEffect, useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { api } from '../../services/api'

const SuccessFeedback = () => {
    const { office } = useParams()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const token = searchParams.get('token')
    
    const [officeName, setOfficeName] = useState('')
    const [isValid, setIsValid] = useState(null)
    useEffect(() => {
        const verifyAndFetch = async () => {
            try {
                const statusRes = await api.get(`/feedback-status/${office}`)
                
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
        <div>
            <h1>Thank you for your feedback for {officeName} today!</h1>
            <p>You have already submitted your feedback. Please come back tomorrow.</p>
        </div>
    )
}

export default SuccessFeedback
