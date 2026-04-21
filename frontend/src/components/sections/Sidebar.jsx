import { startTransition, memo, useEffect } from 'react'
import { PanelRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { UseTooltip } from '@/helpers/UseTooltip'
import { QRList } from './OfficeQRs'
import { useQR } from '@/context/QRContext'

export const Sidebar = memo(({ isSidebarOpen, setIsSidebarOpen, qrData }) => {
    const { isGenerated } = useQR()

    const handleClose = () => {
        startTransition(() => {
            setIsSidebarOpen(false)
        })
    }

    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
        }
    }, [isSidebarOpen])

    return (
        <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: isSidebarOpen ? 0 : "100%" }}
            transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-full lg:w-1/2 bg-black/80 text-white z-50"
        >
            <div className="p-4 space-y-4 h-full overflow-y-auto">

                <UseTooltip content={'Close sidebar'}>
                    <motion.button
                        onClick={handleClose}
                        className="cursor-pointer"
                        whileHover={{ scale: 1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <PanelRight size={24} color='white' />
                    </motion.button>
                </UseTooltip>

                <QRList qrData={qrData} isGenerated={isGenerated} />
            </div>
        </motion.aside>
    )
})