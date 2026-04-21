import { startTransition, memo, useEffect } from 'react'
import { PanelRight } from 'lucide-react'
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
        <aside className={`fixed top-0 right-0 h-full w-full lg:w-1/2 bg-black/80 backdrop-blur-md text-white z-50 transition-transform duration-200 ease-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-4 space-y-4 h-full overflow-y-auto">

                <UseTooltip content={'Close sidebar'}>
                    <button
                        onClick={handleClose}
                        className="cursor-pointer hover:scale-110 active:scale-95 transition-transform"
                    >
                        <PanelRight size={24} color='white' />
                    </button>
                </UseTooltip>

                <QRList qrData={qrData} isGenerated={isGenerated} />
            </div>
        </aside>
    )
})