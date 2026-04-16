import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { QrCodeIcon } from 'lucide-react'
import { motion } from 'framer-motion'
export const ButtonOpenMainSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <motion.button 
                        className={`${isSidebarOpen ? 'pointer-events-none opacity-50' : 'relative z-10'} cursor-pointer`}
                        onClick={() => setIsSidebarOpen(true)}
                        whileHover={isSidebarOpen ? {} : { scale: 1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isSidebarOpen}
                    >
                        <QrCodeIcon size={48} color='white' />
                    </motion.button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>View Office QR Codes</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}