import { Inputs } from '../../ui/Inputs'
import { ErrorMessage } from '../../ui/ErrorMessage'

const RespondentProfileForm = ({ formData, setFormData, errors, clearError }) => {

    const handleChange = (fieldName, value) => {
        clearError(fieldName)
        setFormData(
            prev => ({
                ...prev,
                [fieldName]: value
            })
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Inputs
                type="text"
                name="client_name"
                value={formData.client_name}
                className="w-full" 
                onChange={(e) => handleChange('client_name', e.target.value)}
                placeholder="(Optional) Client's Name"
            />
            <ErrorMessage message={errors.client_name} />

            <Inputs
                type="text"
                name="client_phone"
                value={formData.client_phone}
                className="w-full"
                onChange={(e) => handleChange('client_phone', e.target.value)}
                placeholder="(Optional) Client's Phone"
            />
            <ErrorMessage message={errors.client_phone} />
        </div>
    )
}

export default RespondentProfileForm