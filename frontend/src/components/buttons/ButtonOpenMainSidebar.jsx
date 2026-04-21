import { startTransition } from 'react'
import { QrCodeIcon } from 'lucide-react'
import { UseTooltip } from '@/helpers/UseTooltip'
export const ButtonOpenMainSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const handleClick = () => {
        startTransition(() => {
            setIsSidebarOpen(true)
        })
    }
    return (
        <UseTooltip content={'View Office QR codes'}>
            <button 
                className={`${isSidebarOpen ? 'pointer-events-none opacity-50' : 'relative z-10'} cursor-pointer hover:scale-110 active:scale-95 transition-transform`}
                onClick={handleClick}
                disabled={isSidebarOpen}
            >
                <QrCodeIcon size={48} color='white' />
            </button>
        </UseTooltip>
    )
}