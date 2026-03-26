import { useState, useEffect } from 'react'
import { api } from '../services/api'

export const useFetchOffice = ({ setIsGenerated, isGenerated }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const [list, setList] = useState({ local: [], remote: [] })

    const fetch = async () => {
        setIsLoading(true)
        try {
            const response = await api.get('/qrOffices')
            console.log("API response:", response)
            console.log("Response data:", response.data)

            const localImages = (response.data.local || []).map(item => ({
                office_id: item.office_id,
                name: item.name,
                url: item.url,
                target_url: item.target_url,
                type: item.type
            }))

            const remoteImages = (response.data.remote || []).map(item => ({
                office_id: item.office_id,
                name: item.name,
                url: item.url,
                target_url: item.target_url,
                type: item.type
            }))

            setList({ local: localImages, remote: remoteImages })

            const hasLocal = localImages.length > 0
            const hasRemote = remoteImages.length > 0
            
            if (hasLocal || hasRemote) {
                setIsGenerated(true)
                setMessage(null)
            } else {
                setMessage("No QR codes generated yet. Click 'Generate' to create them.")
            }
        } catch (err) {
            console.error('Something went wrong: ', err)
            if (err.response) {
                console.error("Error response data: ", err.response.data)
                console.error("Error response status: ", err.response.status)
            } else if (err.request) {
                console.error("No response received, request: ", err.request)
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetch()
    }, [isGenerated])

    return { isLoading, list, message }
}
