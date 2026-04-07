import { ClientFormUI } from '../../ui/ClientFormUI'
import { useFetchSpecificOffice } from './../../../hooks/useFetchSpecificOffice'
import { useSendFeedback } from '../../../hooks/useSendFeedback'

import { Buttons } from '../../ui/Buttons'
import { Inputs } from '../../ui/Inputs'

import ClientDemographicForm from './ClientDemographicForm'

const ClientFeedbackForm = () => {

    const { loading, data } = useFetchSpecificOffice()

    const { handleSubmit, loadingFeedback, formData, setFormData, userId } = useSendFeedback()

    return (
        <>
            {loading ? (
                <>Loading...</>
            ) : !data || data.error ? (
                <>404 Office not found</>
            ) : (
                <ClientFormUI title={data.name}>
            
                <form onSubmit={handleSubmit}>
                    {data.services?.length > 0 && (
                        <ul>
                        {data.services.map((service, index) => (
                            <li key={index}>
                            {typeof service === 'string' ? (
                                <label>
                                    <Inputs
                                        type="radio"
                                        name="service"
                                        checked={formData.selectedService === service}
                                        onChange={() =>
                                            setFormData(prev => ({ ...prev, selectedService: service }))
                                        }
                                    />
                                    {service}
                                </label>
                            ) : (
                                <>
                                <label>
                                    <Inputs
                                    type="radio"
                                    name="service"
                                    checked={formData.selectedService === service.name}
                                    onChange={() =>
                                        setFormData(prev => ({ ...prev, selectedService: service.name }))
                                    }
                                    />
                                    {service.name}
                                </label>

                                {service.sub_services?.length > 0 && (
                                    <ul className="pl-6 space-y-1">
                                    {service.sub_services.map((sub, i) => (
                                        <li key={i}>
                                        <label>
                                            <Inputs
                                            type="radio"
                                            name="service"
                                            checked={formData.selectedService === sub}
                                            onChange={() =>
                                                setFormData(prev => ({ ...prev, selectedService: sub }))
                                            }
                                            />
                                            {sub}
                                        </label>
                                        </li>
                                    ))}
                                    </ul>
                                )}
                                </>
                            )}
                            </li>
                        ))}
                        </ul>
                    )}

                    <ClientDemographicForm formData={formData} setFormData={setFormData} />

                    <Buttons type="submit">{loadingFeedback ? 'Submitting..' : 'Submit Feedback'}</Buttons>
                </form>

                <h1>Cookie: {userId}</h1>

                </ClientFormUI>
            )}
        </>
    )
}

export default ClientFeedbackForm