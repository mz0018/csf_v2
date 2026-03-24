import { useState } from 'react'
import { api } from '../services/api'

export const usePrintOfficeQr = () => {

    const [isLoading, setIsLoading] = useState(false)
    // const [qrData, setQrData] = useState(null)
    // const [hasError, setHasError] = useState(null)

    const handlePrinting = async () => {
        setIsLoading(true)
        try {
            const response = await api.get('/qrcodes')
            console.log('Qr codes: ', response.data.message)
        } catch (err) {
            console.error('Something went wrong: ', err)
            debugger;
        } finally {
            setIsLoading(false)
        }
    }

    return { isLoading, handlePrinting }
}
