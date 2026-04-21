import { memo, useState } from 'react'
import { Select } from '../ui/Select'
import { UseTooltip } from '@/helpers/UseTooltip'
import { useQR } from '@/context/DisplayQRContext'

const QRListItem = memo(({ title, qrList }) => {

    if (!qrList?.length) return null

    const { showAsDefault } = useQR()
    
    return (
        <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {qrList.map((qr) => (
                    <UseTooltip key={qr.name} content={qr.name}>
                        <li className="flex flex-col items-center text-center hover:scale-105 active:scale-95 transition-transform">
                            <p className="mb-2 text-xs whitespace-nowrap">{qr.short_name}</p>
                            <div className="p-1 bg-white rounded-sm">
                                <img
                                    src={qr.url}
                                    alt={qr.name}
                                    loading="lazy"
                                    className="cursor-pointer w-[150px] h-[150px] object-contain"
                                    onClick={() => showAsDefault(qr.name, qr.url)}
                                />
                            </div>
                        </li>
                    </UseTooltip>
                ))}
            </ul>
        </div>
    )
})

export const QRList = memo(({ qrData, isGenerated }) => {
    const [activeQR, setActiveQR] = useState('production')

    const select_options = [
        { label: "Local QR", value: "local" },
        { label:"Production QR", value: "production" },
        { label: "Kiosk Mode", value: "kiosk" },
    ]

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
            <Select 
                value={activeQR} 
                onChange={(e) => setActiveQR(e.target.value)}
            >
                {select_options.map(opt => (
                    <option className="text-gray-500" key={opt.label} value={opt.value}>{opt.label}</option>
                ))}
            </Select>

            {activeQR === 'production' ? (
                <QRListItem 
                    title="Remote QR Codes (Production)" 
                    qrList={qrData.remote}
                />
            ) : (
                <QRListItem 
                    title="Local QR Codes (Testing)" 
                    qrList={qrData.local}
                />
            )}
        </div>
    )
})