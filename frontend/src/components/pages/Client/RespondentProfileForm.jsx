import { Inputs } from '../../ui/Inputs'

const RespondentProfileForm = ({ formData, setFormData }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Inputs
                type="text"
                name="client_name"
                value={formData.client_name}
                className="w-full" 
                onChange={(e) =>
                    setFormData(prev => ({
                        ...prev,
                        client_name: e.target.value
                    }))
                }
                placeholder="(Optional) Client's Name"
            />

            <Inputs
                type="text"
                name="client_phone"
                value={formData.client_phone}
                className="w-full"
                onChange={(e) =>
                    setFormData(prev => ({
                        ...prev,
                        client_phone: e.target.value
                    }))
                }
                placeholder="(Optional) Client's Phone"
            />
        </div>
    )
}

export default RespondentProfileForm