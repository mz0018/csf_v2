import { useFetchOffice } from "../../hooks/useFetchOfficeQr"

export const OfficeQR = ({ setIsGenerated, isGenerated }) => {
    
    const { isLoading, list, message } = useFetchOffice({ setIsGenerated, isGenerated })

    if (isLoading) return <>Please wait, preparing QR code.</>
    
    return (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {!list.length ? (
                <small className="border border-yellow-500 text-yellow-500 bg-yellow-100 p-2 rounded text-center">{message}</small>
            ) : (
                <>
                {list.map((qr) => (
                    <li 
                        key={qr.office_id}
                        className="flex flex-col items-center text-center whitespace-nowrap"
                    >
                        <p className="mb-2 text-xs">{qr.name}</p>
                        <img
                            src={qr.url}
                            alt={qr.name}
                            className="w-[150px] h-[150px] object-contain"
                        />
                    </li>
                ))}
                </>
            )}
        </ul>
    )
}