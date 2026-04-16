import { PrintOfficeQr } from '../../buttons/PrintOfficeQr'
import { QRList } from '../../sections/OfficeQRs'
import { useQR } from '../../../context/QRContext'

const InfoTechPage = () => {

    const { isGenerated, setIsGenerated, qrData } = useQR()

    return (
        <>
        <PrintOfficeQr isGenerated={isGenerated} setIsGenerated={setIsGenerated} />
        <QRList qrData={qrData} isGenerated={isGenerated} />
        </>
    )
}

export default InfoTechPage