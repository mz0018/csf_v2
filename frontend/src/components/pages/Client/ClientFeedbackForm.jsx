import { lazy, useState } from 'react'
import { ClientFormUI } from '../../ui/ClientFormUI'
import { useFetchSpecificOffice } from './../../../hooks/useFetchSpecificOffice'

const ClientDemographicForm = lazy(() => import('./ClientDemographicForm'))

const ClientFeedbackForm = () => {

    const { loading, data } = useFetchSpecificOffice()
    const [selectedService, setSelectedService] = useState('')

    if (loading) return <>Loading...</>
    if (!data || data.error) return <>404 Office not found</>

    const handleRadioChange = (serviceName) => {
        setSelectedService(serviceName)
    }

    return (
        <ClientFormUI title={data.name}>

            {data.services && data.services.length > 0 && (
                <ul className="space-y-2">
                    {data.services.map((service, index) => (
                        <li key={index}>
                            {typeof service === 'string' ? (
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="service"
                                        checked={selectedService === service}
                                        onChange={() => handleRadioChange(service)}
                                    />
                                    {service}
                                </label>
                            ) : (
                                <>
                                    <label className="flex items-center gap-2 cursor-pointer font-medium">
                                        <input
                                            type="radio"
                                            name="service"
                                            checked={selectedService === service.name}
                                            onChange={() => handleRadioChange(service.name)}
                                        />
                                        {service.name}
                                    </label>

                                    {service.sub_services && (
                                        <ul className="pl-6 space-y-1">
                                            {service.sub_services.map((sub, i) => (
                                                <li key={i}>
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="service"
                                                            checked={selectedService === sub}
                                                            onChange={() => handleRadioChange(sub)}
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

            <ClientDemographicForm />

        </ClientFormUI>
    )
}

export default ClientFeedbackForm