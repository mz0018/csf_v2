import { useEffect } from 'react'

import { useCheckFeedbackStatus } from '../../../hooks/useCheckFeedbackStatus'
import { useFetchSpecificOffice } from './../../../hooks/useFetchSpecificOffice'
import { useSendFeedback } from '../../../hooks/useSendFeedback'

import { LanguageSwitcher } from '../../buttons/LanguageSwitcher'

import { ClientFormUI } from '../../ui/ClientFormUI'
import { Buttons } from '../../ui/Buttons'
import { Inputs } from '../../ui/Inputs'
import { Textarea } from '../../ui/Textarea'

import { useNavigate } from 'react-router-dom'

import ClientDemographicForm from './ClientDemographicForm'
import ClientServiceRatingForm from './ClientServiceRatingForm'
import RespondentProfileForm from './RespondentProfileForm'

const ClientFeedbackForm = () => {

    const { loading, data } = useFetchSpecificOffice()

    const { handleSubmit, loadingFeedback, formData, setFormData, userId } = useSendFeedback()
    const { alreadySubmitted, loading: checkingStatus } = useCheckFeedbackStatus()

    const navigate = useNavigate()

    useEffect(() => {
        if (!checkingStatus && alreadySubmitted && data?.name) {
            navigate(`/client/success-feedback/${data.office_id}`)
        }
    }, [alreadySubmitted, checkingStatus, data, navigate])

    if (checkingStatus || loading) {
        return <>Loading...</>
    }

    return (
        <>
            {loading ? (
                <>Loading...</>
            ) : !data || data.error ? (
                <>404 Office not found</>
            ) : (
                <ClientFormUI title={data.name}>
            
                <form onSubmit={handleSubmit}>

                    <RespondentProfileForm formData={formData} setFormData={setFormData} />

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
                    <ClientServiceRatingForm formData={formData} setFormData={setFormData} />

                    <Textarea
                        value={formData.other_suggestions}
                        onChange={
                            (e) => setFormData(prev => ({
                                ...prev,
                                other_suggestions: e.target.value,
                            }))
                        }
                        placeholder='(Optional) Other suggestions...'
                    />

                    <Buttons type="submit">{loadingFeedback ? 'Submitting..' : 'Submit Feedback'}</Buttons>
                </form>

                <h1>Cookie: {userId}</h1>
                <LanguageSwitcher />
                </ClientFormUI>
            )}
        </>
    )
}

export default ClientFeedbackForm