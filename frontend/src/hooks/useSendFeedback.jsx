import { useState } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { useUserId } from './useUserId'
import { api } from '../services/api'

export const useSendFeedback = () => {

    const [loadingFeedback ,setLoadingFeedback] = useState(false)

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

    const userId = useUserId()

    const validateForm = () => {
        if (!formData.selectedService) {
            return 'Please select a service';
        }

        if (!formData.affiliation) {
            return 'Please select affiliation';
        }

        if (!formData.age) {
            return 'Please select age group';
        }

        if (!formData.sex) {
            return 'Please select sex';
        }

        if (formData.address === "Within Solano" && !formData.specific_location) {
            return 'Please select address';
        }

        if (!formData.employment_status) {
            return 'Please select employment status';
        }

        const requiredRatings = ["Responsiveness", "Reliability", "Access & Facilities", "Communication", "Costs", "Integrity", "Assurance", "Outcome"]

        for (const rating of requiredRatings) {
            if (!formData.serviceRatings[rating]) {
                return `Please rate ${rating}`;
            }
        }

        return null;
    };

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

        const error = validateForm()

        if (error) {
            alert(error)
            return
        }

        setLoadingFeedback(true)
        try {
            console.log(formData)
            console.log('Cookie: ', userId)

            const result = await api.post(`/save-feedback/${userId}`, formData)

            console.log(result)

            alert('Feedback sent successfully')
            resetForm()
        } catch (err) {
            console.error('Something went wrong! ', err)
        } finally {
            setLoadingFeedback(false)
        }
    }
    
    return { handleSubmit, loadingFeedback, formData, setFormData, userId }
}