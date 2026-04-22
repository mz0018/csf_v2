import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '@/services/api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchUser = async () => {
        try {
            const res = await api.get('/me')
            if (res.data.success) {
                setUser(res.data.user)
            } else {
                setUser(null)
            }
        } catch (err) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const signOut = async () => {
        try {
            await api.post('/signout')
        } catch (err) {
            // Ignore errors
        }
        setUser(null)
    }

    const refreshUser = () => {
        fetchUser()
    }

    return (
        <AuthContext.Provider value={{ user, loading, signOut, refreshUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}