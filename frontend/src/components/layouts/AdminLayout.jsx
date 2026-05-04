import { Outlet } from 'react-router-dom'
import { AdminSidebar } from '@/components/sections/AdminSidebar'
import { useAuth } from '@/context/AuthContext'

export const AdminLayout = ({ userType }) => {
    const { user, signOut } = useAuth()

    return (
        <div className="flex min-h-screen">
            <AdminSidebar
                user={user}
                userType={userType}
                onSignOut={signOut}
            />
            <main className="flex-1 bg-gray-100 p-6 overflow-auto">
                <Outlet />
            </main>
        </div>
    )
}
