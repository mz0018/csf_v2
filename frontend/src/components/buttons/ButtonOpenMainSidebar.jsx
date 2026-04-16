import { QrCodeIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { UseTooltip } from '@/helpers/UseTooltip'

export const ButtonOpenMainSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    return (
            <UseTooltip content={'View Office QR codes'}>
                <motion.button 
                    className={`${isSidebarOpen ? 'pointer-events-none opacity-50' : 'relative z-10'} cursor-pointer`}
                    onClick={() => setIsSidebarOpen(true)}
                    whileHover={isSidebarOpen ? {} : { scale: 1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isSidebarOpen}
                >
                    <QrCodeIcon size={48} color='white' />
                </motion.button>
            </UseTooltip>
    )
}