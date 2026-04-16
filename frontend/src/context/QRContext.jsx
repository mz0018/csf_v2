import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { api } from '../services/api'
const QRContext = createContext()
export const QRProvider = ({ children }) => {
    const [isGenerated, setIsGenerated] = useState(false)
    const [qrData, setQrData] = useState({ local: [], remote: [] })
    
    const fetchQRData = useCallback(async () => {
        try {
            const res = await api.get('/qrOffices')
            const local = res.data.local || []
            const remote = res.data.remote || []
            setQrData({ local, remote })
            if (local.length > 0 || remote.length > 0) {
                setIsGenerated(true)
            }
        } catch (err) {
            console.log('Failed to fetch QR:', err)
        }
    }, [])
    useEffect(() => {
        fetchQRData()
    }, [fetchQRData])
    return (
        <QRContext.Provider value={{ isGenerated, setIsGenerated, qrData, fetchQRData }}>
            {children}
        </QRContext.Provider>
    )
}
export const useQR = () => useContext(QRContext)