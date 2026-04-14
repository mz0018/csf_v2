import { useState } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { useUserId } from './useUserId'
import { api } from '../services/api'
import { useParams, useNavigate } from 'react-router-dom'
import { validateForm } from '../helpers/validateForm'

export const useSendFeedback = () => {
    const { office } = useParams()
    const userId = useUserId()
    const navigate = useNavigate()

    const [loadingFeedback ,setLoadingFeedback] = useState(false)
    const [errors, setErrors] = useState({})

    const defaultFormData = {
        client_name: '',
        client_phone: '',
        selectedService: '',
        affiliation: '',
        age: '',
        sex: '',
        address: '',
        specific_location: '',
        employment_status: '',
        serviceRatings: {},
        other_suggestions: ''
    }

    const [formData, setFormData] = useLocalStorage('clientForm', defaultFormData)

    const resetForm = () => {
        setFormData(defaultFormData);
        localStorage.removeItem('clientForm')
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!userId) {
            alert('Cookie not found. Please refresh the page and try again.')
            return
        }

        const errorObj = validateForm(formData)

        if (Object.keys(errorObj).length > 0) {
            setErrors(errorObj)
            return
        }

        setLoadingFeedback(true)
        try {

            const result = await api.post(`/save-feedback/${office}`, formData)

            if (result.data.success) {
                navigate(`/client/success-feedback/${office}?token=${result.data.id}`)
                resetForm()
            } else if (result.data.message) {
                alert(result.data.message)
            }

        } catch (err) {
            console.error('Something went wrong! ', err)
        } finally {
            setLoadingFeedback(false)
        }
    }

    const clearError = (fieldName) => {
        setErrors(prev => {
            const newErrors = { ...prev }
            delete newErrors[fieldName]
            return newErrors
        })
    }
    
    return { handleSubmit, loadingFeedback, formData, setFormData, userId, errors, clearError }
}