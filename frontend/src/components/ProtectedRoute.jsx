import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { AdminLayout } from '@/components/layouts/AdminLayout'

export const ProtectedRoute = ({ children, requiredUserType }) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/signin" state={{ from: location }} replace />
    }

    if (requiredUserType && user.user_type !== requiredUserType) {
        return <Navigate to="/signin" replace />
    }

    return children
}

export const AdminProtectedRoute = ({ requiredUserType }) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/signin" state={{ from: location }} replace />
    }

    if (user.user_type !== requiredUserType) {
        return <Navigate to="/signin" replace />
    }

    return <AdminLayout userType={requiredUserType} />
}