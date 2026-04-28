import { useAuth } from '@/context/AuthContext'
import { ClientFormUI } from '../ui/ClientFormUI'
import { Buttons } from '../ui/Buttons'
export const OfficeAdmin = () => {
    const { user, signOut } = useAuth()

    if (!user) return null

    return (
        <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Admin Dashboard</h3>
                <Buttons
                    onClick={signOut}
                    className="p-2 text-sm bg-red-600 hover:bg-red-700"
                >
                    Sign Out
                </Buttons>
            </div>
            <div className="mb-6 p-4 bg-gray-800/50 rounded">
                <h4 className="font-medium mb-2">User Details</h4>
                <div className="space-y-1 text-sm">
                    <div>User: {user.username}</div>
                    <div>User Type: {user.user_type}</div>
                </div>
            </div>
            <ClientFormUI title="New Form" />
        </div>
    )
}