import { PrintOfficeQr } from '@/components/buttons/PrintOfficeQr'
import { useQR } from '@/context/QRContext'
import { ClientFormUI } from '@/components/ui/ClientFormUI'

const InfoTechPage = () => {
    const { isGenerated, setIsGenerated } = useQR()

    return (
        <ClientFormUI>
            <PrintOfficeQr isGenerated={isGenerated} setIsGenerated={setIsGenerated} />
            <p>IT dashboard</p>
        </ClientFormUI>
    )
}

export default InfoTechPage