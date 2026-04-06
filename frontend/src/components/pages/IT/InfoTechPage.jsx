import { useState, useEffect } from "react"
import { api } from "../../../services/api"

import { PrintOfficeQr } from "../../buttons/PrintOfficeQr"
import { OfficeQR } from "../../sections/OfficeQRs"

const InfoTechPage = () => {
    const [isGenerated, setIsGenerated] = useState(false);

    useEffect(() => {
        const checkQR = async () => {
            try {
                const res = await api.get('/qrOffices')

                const hasLocal = res.data.local?.length > 0
                const hasRemote = res.data.remote?.length > 0

                if (hasLocal || hasRemote) {
                    setIsGenerated(true)
                }
            } catch (err) {
                console.log('Failed to fetch QR data: ', err)
            }
        }
        checkQR()
    }, [])

    return (
        <>
        <PrintOfficeQr isGenerated={isGenerated} setIsGenerated={setIsGenerated} />
        <OfficeQR setIsGenerated={setIsGenerated} isGenerated={isGenerated} />
        </>
    )
}

export default InfoTechPage