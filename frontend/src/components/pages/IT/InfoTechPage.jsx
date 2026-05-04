import { PrintOfficeQr } from '../../buttons/PrintOfficeQr'
import { useQR } from '../../../context/QRContext'
import { useAuth } from '@/context/AuthContext'
import { ClientFormUI } from '@/components/ui/ClientFormUI'
import { Buttons } from '@/components/ui/Buttons'

const InfoTechPage = () => {
    const { user, signOut } = useAuth()
    const { isGenerated, setIsGenerated } = useQR()

    if (!user) return null

    return (
        <ClientFormUI>
            <PrintOfficeQr isGenerated={isGenerated} setIsGenerated={setIsGenerated} />
            <p>IT dashboard</p>
            <Buttons 
                onClick={signOut}
                className="p-2 text-sm bg-red-600 hover:bg-red-700"
            >
                Sign Out
            </Buttons>
        </ClientFormUI>
    )
}

export default InfoTechPage