import { useFetchOffice } from '../../hooks/useFetchOfficeQr'
import { motion } from 'framer-motion'
import { UseTooltip } from '@/helpers/UseTooltip'

const QRList = ({ title, qrList, isLocal }) => {
    if (!qrList.length) return null
    
    return (
        <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {qrList.map((qr) => (
                    <UseTooltip key={qr.name} content={qr.name}>
                        <motion.li 
                            key={`${qr.type}-${qr.office_id}`}
                            className="flex flex-col items-center text-center"
                            whileHover={{ scale: 1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <p className="mb-2 text-xs whitespace-nowrap">{qr.short_name}</p>
                            <div className="p-1 bg-white rounded-sm">
                                <img
                                    src={qr.url}
                                    alt={qr.name}
                                    className="cursor-pointer w-[150px] h-[150px] object-contain"
                                />
                            </div>
                            {/* <p className="mt-2 text-xs text-gray-500 break-all">{qr.target_url}</p> */}
                        </motion.li>
                    </UseTooltip>
                ))}
            </ul>
        </div>
    )
}

export const OfficeQR = ({ setIsGenerated, isGenerated }) => {
    const { isLoading, list, message } = useFetchOffice({ setIsGenerated, isGenerated })

    if (isLoading) return <>Please wait, preparing QR code.</>
    
    const hasAnyQR = list.local.length > 0 || list.remote.length > 0
    
    if (!hasAnyQR) {
        return (
            <small className="border border-yellow-500 text-yellow-500 bg-yellow-100 p-2 rounded text-center">
                {message || "No QR codes generated yet. Click 'Generate' to create them."}
            </small>
        )
    }
    
    return (
        <div>
            <QRList title="Local QR Codes (Testing)" qrList={list.local} isLocal={true} />
            <QRList title="Remote QR Codes (Production)" qrList={list.remote} isLocal={false} />
        </div>
    )
}
