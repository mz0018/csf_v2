import { PrintOfficeQr } from '../../buttons/PrintOfficeQr'
import { OfficeQR } from '../../sections/OfficeQRs'
import { useQR } from '../../../context/QRContext'

const InfoTechPage = () => {

    const { isGenerated, setIsGenerated } = useQR()

    return (
        <>
        <PrintOfficeQr isGenerated={isGenerated} setIsGenerated={setIsGenerated} />
        <OfficeQR setIsGenerated={setIsGenerated} isGenerated={isGenerated} />
        </>
    )
}

export default InfoTechPage