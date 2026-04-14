import { useEffect } from 'react'
import { ClipLoader } from 'react-spinners'

import { useCheckFeedbackStatus } from '../../../hooks/useCheckFeedbackStatus'
import { useFetchSpecificOffice } from './../../../hooks/useFetchSpecificOffice'
import { useSendFeedback } from '../../../hooks/useSendFeedback'

import { LanguageSwitcher } from '../../buttons/LanguageSwitcher'

import { ClientFormUI } from '../../ui/ClientFormUI'
import { Buttons } from '../../ui/Buttons'
import { Inputs } from '../../ui/Inputs'
import { Textarea } from '../../ui/Textarea'
import { ErrorMessage } from '../../ui/ErrorMessage'

import { useNavigate } from 'react-router-dom'

import ClientDemographicForm from './ClientDemographicForm'
import ClientServiceRatingForm from './ClientServiceRatingForm'
import RespondentProfileForm from './RespondentProfileForm'

import { feedbackAutoScrollError } from '../../../helpers/feedbackAutoScrollError'

const ClientFeedbackForm = () => {

    const { loading, data } = useFetchSpecificOffice()

    const { handleSubmit, loadingFeedback, formData, setFormData, userId, errors, clearError } = useSendFeedback()
    const { alreadySubmitted, loading: checkingStatus } = useCheckFeedbackStatus()

    const refs = feedbackAutoScrollError(errors)

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
                <LanguageSwitcher />
            
                <form onSubmit={handleSubmit} className="space-y-6">

                    <RespondentProfileForm formData={formData} setFormData={setFormData} errors={errors} clearError={clearError} />

                    {data.services?.length > 0 && (
                        <ul ref={refs.service}>
                        <h1>Type of Services</h1>
                        {data.services.map((service, index) => (
                            <li key={index}>
                            {typeof service === 'string' ? (
                                <label className="inline-flex items-center gap-2">
                                    <Inputs
                                        type="radio"
                                        name="service"
                                        checked={formData.selectedService === service}
                                        onChange={() => {
                                            clearError('service')
                                            setFormData(prev => ({ ...prev, selectedService: service }))
                                        }}
                                    />
                                    {service}
                                </label>
                            ) : (
                                <>
                                <label className="inline-flex items-center gap-2">
                                    <Inputs
                                    type="radio"
                                    name="service"
                                    checked={formData.selectedService === service.name}
                                    onChange={() => {
                                        clearError('service')
                                        setFormData(prev => ({ ...prev, selectedService: service.name }))
                                    }}
                                    />
                                    {service.name}
                                </label>

                                {service.sub_services?.length > 0 && (
                                    <ul className="pl-6 space-y-1">
                                    {service.sub_services.map((sub, i) => (
                                        <li key={i}>
                                        <label className="inline-flex items-center gap-2">
                                            <Inputs
                                            type="radio"
                                            name="service"
                                            checked={formData.selectedService === sub}
                                            onChange={() => {
                                                clearError('service')
                                                setFormData(prev => ({ ...prev, selectedService: sub }))
                                            }}
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
                        
                        <ErrorMessage message={errors.service} />

                        </ul>
                    )}

                    <ClientDemographicForm formData={formData} setFormData={setFormData} errors={errors} clearError={clearError} />
                    <ClientServiceRatingForm formData={formData} setFormData={setFormData} errors={errors} clearError={clearError} />

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

                    <Buttons type="submit" disabled={loadingFeedback}>
                        {loadingFeedback ? (
                            <ClipLoader color="white" size={20} />
                        ) : (
                            "Submit Feedback"
                        )}
                    </Buttons>
                </form>

                <small className="block text-right font-light text-gray-400 pt-4">
                    Form ID: {userId}
                </small>

                </ClientFormUI>
            )}
        </>
    )
}

export default ClientFeedbackForm