import { useAuth } from '@/context/AuthContext'
import { ClientFormUI } from '@/components/ui/ClientFormUI'

const HRDashboard = () => {
    const { user } = useAuth()

    if (!user) return null

    return (
        <ClientFormUI>
            <div>User: {user.username}</div>
            <div>User Type: {user.user_type}</div>
        </ClientFormUI>
    )
}

export default HRDashboard