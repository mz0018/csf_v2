import { useFetchOffice } from "../../hooks/useFetchOfficeQr"

export const OfficeQR = () => {
    
    const { isLoading, list } = useFetchOffice()

    if (isLoading) return <>Please wait, preparing QR code.</>
    
    return (
        <ul>
        {list.map((qr) => (
            <li key={qr.office_id}>
                <p>{qr.name}</p>
                <img
                    src={qr.url}
                    alt={qr.name}
                    width={150}
                />
            </li>
        ))}
        </ul>
    )
}