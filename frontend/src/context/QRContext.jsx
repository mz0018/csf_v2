import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../services/api'

const QRContext = createContext()

export const QRProvider = ({ children }) => {

    const [isGenerated, setIsGenerated] = useState(false)
    
    useEffect(() => {
        const checkQR = async () => {
            try {
                const res = await api.get('/qrOffices')
                const hasLocal = res.data.local?.length > 0
                const hasRemote = res.data.remote?.length > 0
                if (hasLocal || hasRemote) setIsGenerated(true)
            } catch (err) {
                console.log('Failed to check QR:', err)
            }
        }
        checkQR()
    }, [])

    return (
        <QRContext.Provider value={{ isGenerated, setIsGenerated }}>
            {children}
        </QRContext.Provider>
    )

}
export const useQR = () => useContext(QRContext)