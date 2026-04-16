import { memo } from 'react'
import { motion } from 'framer-motion'
import { UseTooltip } from '@/helpers/UseTooltip'

const QRListItem = memo(({ title, qrList }) => {
    if (!qrList?.length) return null
    
    return (
        <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {qrList.map((qr) => (
                    <UseTooltip key={qr.name} content={qr.name}>
                        <motion.li 
                            className="flex flex-col items-center text-center"
                            whileHover={{ scale: 1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <p className="mb-2 text-xs whitespace-nowrap">{qr.short_name}</p>
                            <div className="p-1 bg-white rounded-sm">
                                <img
                                    src={qr.url}
                                    alt={qr.name}
                                    loading="lazy"
                                    className="cursor-pointer w-[150px] h-[150px] object-contain"
                                />
                            </div>
                        </motion.li>
                    </UseTooltip>
                ))}
            </ul>
        </div>
    )
})
export const QRList = memo(({ qrData, isGenerated }) => {
    const hasLocal = qrData?.local?.length > 0
    const hasRemote = qrData?.remote?.length > 0
    const hasAnyQR = hasLocal || hasRemote
    
    if (!isGenerated || !hasAnyQR) {
        return (
            <small className="border border-yellow-500 text-yellow-500 bg-yellow-100 p-2 rounded text-center">
                No QR codes generated yet. Click 'Generate' to create them.
            </small>
        )
    }
    
    return (
        <div>
            <QRListItem title="Local QR Codes (Testing)" qrList={qrData.local} />
            <QRListItem title="Remote QR Codes (Production)" qrList={qrData.remote} />
        </div>
    )
})