import { useTranslation } from 'react-i18next'
import { Inputs } from '../../ui/Inputs'

const ClientServiceRatingForm = ({ formData, setFormData }) => {
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
        { labelKey: "ratings.stronglyAgree", value: 5 },
        { labelKey: "ratings.agree", value: 4 },
        { labelKey: "ratings.neutral", value: 3 },
        { labelKey: "ratings.disagree", value: 2 },
        { labelKey: "ratings.stronglyDisagree", value: 1 }
    ]

    const handleRatingChange = (serviceName, ratingValue) => {
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
        {formServices.map((service) => (
            <div key={service.name}>
                <h3>{t(service.titleKey)}</h3>
                <p>{t(service.key)}</p>
                <div className="flex flex-wrap gap-2">
                    {ratingOptions.map((option) => (
                        <label key={option.value} className="inline-flex items-center gap-2">
                            <Inputs
                                type="radio"
                                name={service.name}
                                value={option.value}
                                checked={formData.serviceRatings?.[service.name] === option.value}
                                onChange={() => handleRatingChange(service.name, option.value)}
                            />
                            {t(option.labelKey)}
                        </label>
                    ))}
                </div>
            </div>
        ))}
        </div>
    )
}

export default ClientServiceRatingForm