import { useAuth } from '@/context/AuthContext'
import { ClientFormUI } from '../ui/ClientFormUI'
import { Buttons } from '../ui/Buttons'

const HRDashboard = () => {
    const { user, signOut } = useAuth()

    if (!user) return null

    return (
        <ClientFormUI>
            <Buttons
                onClick={signOut}
                className="p-2 text-sm bg-red-600 hover:bg-red-700"
            >
                Sign Out
            </Buttons>
            <div>User: {user.username}</div>
            <div>User Type: {user.user_type}</div>
        </ClientFormUI>
    )
}

export default HRDashboard