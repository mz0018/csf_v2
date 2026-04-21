import { useState } from 'react'

export const useAuthenticate = () => {

    const [errors, setErrors] = useState({
        username: '',
        password: '',
        general: ''
    })

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))

        setErrors((prev) => ({
            ...prev,
            [name]: '',
            general: ''
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

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

        try {
            console.log('Form submitted:', formData)
        } catch (err) {
            setErrors((prev) => ({
                ...prev,
                general: 'Something went wrong!'
            }))
        }
    }

    return { formData, handleChange, handleSubmit, errors }
}