import { useState } from 'react'
import { api } from '../services/api'

export const usePrintOfficeQr = ({ setIsGenerated }) => {

    const [isLoading, setIsLoading] = useState(false)

    const handlePrinting = async () => {
        setIsLoading(true)
        try {
            const [localRes, remoteRes] = await Promise.all([
                api.get('/qrcodes/local'),
                api.get('/qrcodes/remote')
            ])
            
            const totalGenerated = localRes.data.generated + remoteRes.data.generated
            console.log('Local QR codes: ', localRes.data.files)
            console.log('Remote QR codes: ', remoteRes.data.files)
            alert(`Generated ${totalGenerated} QR codes! (${localRes.data.generated} local, ${remoteRes.data.generated} remote)`)
            setIsGenerated(true)
        } catch (err) {
            console.error('Something went wrong: ', err)
        } finally {
            setIsLoading(false)
        }
    }

    return { isLoading, handlePrinting }
}
