import { ClientFormUI } from '../../ui/ClientFormUI'
import { useFetchSpecificOffice } from './../../../hooks/useFetchSpecificOffice'
import { useState } from 'react'

const ClientFeedbackForm = () => {

    const { loading, data } = useFetchSpecificOffice()
    const [selectedServices, setSelectedServices] = useState([])

    if (loading) return <>Loading...</>
    if (!data || data.error) return <>404 Office not found</>

    const handleCheckboxChange = (serviceName) => {
        setSelectedServices(prev => 
            prev.includes(serviceName) 
                ? prev.filter(s => s !== serviceName) 
                : [...prev, serviceName]
        )
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
                                        type="checkbox"
                                        checked={selectedServices.includes(service)}
                                        onChange={() => handleCheckboxChange(service)}
                                    />
                                    {service}
                                </label>
                            ) : (
                                <>
                                    <label className="flex items-center gap-2 cursor-pointer font-medium">
                                        <input
                                            type="checkbox"
                                            checked={selectedServices.includes(service.name)}
                                            onChange={() => handleCheckboxChange(service.name)}
                                        />
                                        {service.name}
                                    </label>

                                    {service.sub_services && (
                                        <ul className="pl-6 space-y-1">
                                            {service.sub_services.map((sub, i) => (
                                                <li key={i}>
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedServices.includes(sub)}
                                                            onChange={() => handleCheckboxChange(sub)}
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

        </ClientFormUI>
    )
}

export default ClientFeedbackForm