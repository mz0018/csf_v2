import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../services/api'

const SuccessFeedback = () => {
    const { office } = useParams()
    const [officeName, setOfficeName] = useState('')
    useEffect(() => {
        const fetchOffice = async () => {
            try {
                const response = await api.get(`/office/${office}`)
                setOfficeName(response.data.name)
            } catch (err) {
                console.error(err)
            }
        }
        
        if (office) {
            fetchOffice()
        }
    }, [office])
    return (
        <div>
            <h1>Thank you for your feedback for {officeName} today!</h1>
            <p>You have already submitted your feedback. Please come back tomorrow.</p>
        </div>
    )
}

export default SuccessFeedback