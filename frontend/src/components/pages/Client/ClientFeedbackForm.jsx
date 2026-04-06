import { lazy, useState } from 'react'
import { ClientFormUI } from '../../ui/ClientFormUI'
import { useFetchSpecificOffice } from './../../../hooks/useFetchSpecificOffice'
import { useSendFeedback } from '../../../hooks/useSendFeedback'

import { Buttons } from '../../ui/Buttons'

const ClientDemographicForm = lazy(() => import('./ClientDemographicForm'))

const ClientFeedbackForm = () => {

    const { loading, data } = useFetchSpecificOffice()

    const { handleSubmit, loadingFeedback, formData, setFormData } = useSendFeedback()

    if (loading) return <>Loading...</>
    if (!data || data.error) return <>404 Office not found</>

    return (
        <ClientFormUI title={data.name}>
        
            <form onSubmit={handleSubmit}>
                {data.services?.length > 0 && (
                    <ul className="space-y-2">
                    {data.services.map((service, index) => (
                        <li key={index}>
                        {typeof service === 'string' ? (
                            <label className="flex items-center gap-2 cursor-pointer">
                            <input
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
                            <label className="flex items-center gap-2 cursor-pointer font-medium">
                                <input
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
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
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

        </ClientFormUI>
    )
}

export default ClientFeedbackForm