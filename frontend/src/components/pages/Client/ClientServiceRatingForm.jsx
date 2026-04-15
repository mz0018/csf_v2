import { useTranslation } from 'react-i18next'
import { ErrorMessage } from '../../ui/ErrorMessage'
import { RatingOption } from '../../ui/RatingOption'

const ClientServiceRatingForm = ({ formData, setFormData, errors, clearError }) => {
    const { t } = useTranslation()

     const formServices = [
        { name: "Responsiveness", titleKey: "service_title.responsiveness", key: "services.responsiveness" },
        { name: "Reliability", titleKey: "service_title.reliability", key: "services.reliability" },
        { name: "Access & Facilities", titleKey: "service_title.access", key: "services.access" },
        { name: "Communication", titleKey: "service_title.communication", key: "services.communication" },
        { name: "Costs", titleKey: "service_title.costs", key: "services.costs" },
        { name: "Integrity", titleKey: "service_title.integrity", key: "services.integrity" },
        { name: "Assurance", titleKey: "service_title.assurance", key: "services.assurance" },
        { name: "Outcome", titleKey: "service_title.outcome", key: "services.outcome" }
    ]

    const ratingOptions = [
        { labelKey: "ratings.stronglyAgree", value: 5, emoji: "😄" },
        { labelKey: "ratings.agree", value: 4, emoji: "🙂" },
        { labelKey: "ratings.neutral", value: 3, emoji: "😐" },
        { labelKey: "ratings.disagree", value: 2, emoji: "🙁" },
        { labelKey: "ratings.stronglyDisagree", value: 1, emoji: "😠" }
    ]

    const handleRatingChange = (serviceName, ratingValue) => {
        clearError(serviceName)
        setFormData(prev => ({
            ...prev,
            serviceRatings: {
                ...prev.serviceRatings,
                [serviceName]: ratingValue
            }
        }))
    }

    return (
        <div className="space-y-4">

            <h2>Legend</h2>
            <div className="flex gap-4">
                {ratingOptions.map((legend) => (
                    <p key={legend.labelKey}>{legend.value}-{t(legend.labelKey)}</p>
                ))}
            </div>

            {formServices.map((service) => (
                <div key={service.name}>
                    <h3><a>({t(service.titleKey)}) </a>{t(service.key)}</h3>
                    <div className="flex flex-wrap gap-2">
                        {ratingOptions.map((option) => (
                            <RatingOption
                                key={option.value}
                                option={option}
                                name={service.name}
                                checked={formData.serviceRatings?.[service.name] === option.value}
                                onChange={() => handleRatingChange(service.name, option.value)}
                                value={option.value}
                            />
                        ))}
                    </div>
                    <ErrorMessage message={errors[service.name]} />
                </div>
            ))}
        </div>
    )
}

export default ClientServiceRatingForm