import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '@/services/api'
import { useAuth } from '@/context/AuthContext'

export const useAuthenticate = () => {
    const [errors, setErrors] = useState({
        username: '',
        password: '',
        general: ''
    })
    const [loading, setLoading] = useState(false)
    const [reachLimit, setReachLimit] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const { refreshUser, user } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))

        setErrors((prev) => ({
            ...prev,
            [name]: '',
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (reachLimit) return

        let newErrors = {
            username: '',
            password: '',
            general: ''
        }

        if (!formData.username) {
            newErrors.username = 'Username is required'
        }

        if (!formData.password) {
            newErrors.password = 'Password is required'
        }

        if (newErrors.username || newErrors.password) {
            setErrors(newErrors)
            return
        }

        setLoading(true)
        
        try {
            const res = await api.post('/signin', formData)
            if (res.data.success) {
                const { user_type } = res.data.user
                await refreshUser()
                if (user_type === 'hr_admin') {
                    navigate('/hr-dashboard')
                } else {
                    navigate('/')
                }
            }
        } catch (err) {
            if (err.response?.status === 429) {
                setReachLimit(true)
            } else {
                setReachLimit(false)
            }
            const errorMessage = err.response?.data?.error || err.response?.data?.detail || 'Something went wrong!'
            setErrors((prev) => ({
                ...prev,
                general: errorMessage
            }))
        } finally {
            setLoading(false)
        }
    }

    return { formData, handleChange, handleSubmit, errors, loading, reachLimit }
}