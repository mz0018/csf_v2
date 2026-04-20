import { createContext, useContext, useState } from 'react'

const QRContext = createContext(null)

export const DisplayQRProvider = ({ children }) => {
    const [activeQR, setActiveQR] = useState({
        name: '',
        img: null
    })

    const showAsDefault = (name, url) => {
        const confirmed = window.confirm(`Set "${name}" as default QR?`)
        if (confirmed) {
            setActiveQR({ name, img: url })
        }
    }

    return (
        <QRContext.Provider value={{ activeQR, showAsDefault }}>
            {children}
        </QRContext.Provider>
    )
}

export const useQR = () => {
    const context = useContext(QRContext)
    if (!context) {
        throw new Error('useQR must be used inside QRProvider')
    }
    return context
}