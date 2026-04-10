import { Inputs } from '../../ui/Inputs'

const RespondentProfileForm = ({ formData, setFormData }) => {

    return (
        <>
            <Inputs
                type="text"
                name="client_name"
                value={formData.client_name}
                onChange={
                    (e) => setFormData(prev => ({
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
                onChange={
                    (e) => setFormData(prev => ({
                        ...prev,
                        client_phone: e.target.value
                    }))
                }
                placeholder="(Optional) Client's Phone"
            />
        </>
    )
}

export default RespondentProfileForm