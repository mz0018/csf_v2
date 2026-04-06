import { useState } from 'react'
import { useLocalStorage } from './useLocalStorage'

export const useSendFeedback = () => {

    const [loadingFeedback ,setLoadingFeedback] = useState(false)

    const [formData, setFormData] = useLocalStorage('clientForm', {
        selectedService: '',
        affiliation: '',
        age: '',
        sex: '',
        address: '',
        employment_status: ''
    })

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

        if (!formData.address) {
            return 'Please select address';
        }

        if (!formData.employment_status) {
            return 'Please select employment status';
        }

        return null;
    };

    const resetForm = () => {
        const initialState = {
            selectedService: '',
            affiliation: '',
            age: '',
            sex: '',
            address: '',
            employment_status: ''
        };

        setFormData(initialState);
        localStorage.removeItem('clientForm')
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const error = validateForm()

        if (error) {
            alert(error)
            return
        }

        setLoadingFeedback(true)
        try {
            console.log(formData)
            resetForm()
        } catch (err) {
            console.error()
            debugger;
        } finally {
            setLoadingFeedback(false)
        }
    }
    
    return { handleSubmit, loadingFeedback, formData, setFormData }
}