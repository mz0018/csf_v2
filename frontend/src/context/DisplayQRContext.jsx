import { createContext, useContext, useState } from 'react'
import { ConfirmDialog } from '@/components/modals/ConfirmDialog'

const QRContext = createContext(null)

export const DisplayQRProvider = ({ children, setIsSidebarOpen }) => {
    const [activeQR, setActiveQR] = useState({
        name: '',
        img: null
    })

    const [open, setOpen] = useState(false)
    const [pendingQR, setPendingQR] = useState(null)

    const showAsDefault = (name, url) => {
        setPendingQR({ name, url })
        if (setIsSidebarOpen) setIsSidebarOpen(false)
        setOpen(true)
    }

    const confirmSetDefault = () => {
        if (pendingQR) {
        setActiveQR({
            name: pendingQR.name,
            img: pendingQR.url
        })
        }

        setPendingQR(null)
        setOpen(false)
    }

    return (
        <QRContext.Provider value={{ activeQR, showAsDefault }}>
        
        {children}

        <ConfirmDialog
            open={open}
            onOpenChange={setOpen}
            title={`Set "${pendingQR?.name}" as default QR?`}
            onConfirm={confirmSetDefault}
        />

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