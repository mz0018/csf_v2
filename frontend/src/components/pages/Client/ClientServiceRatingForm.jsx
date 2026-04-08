import { Inputs } from '../../ui/Inputs'

const ClientServiceRatingForm = ({ formData, setFormData }) => {

    const formServices = [
        { name: "Responsiveness", question: "The service was willingly and promptly extended to the client/ customer." },
        { name: "Reliability", question: "Performed the service within the expectation of the client/ customer." },
        { name: "Access & Facilities", question: "Facilities/ resources/ modes of technology were readily available for convenient transactions." },
        { name: "Communication", question: "Materials associated with the service are easily understood and feedback mechanisms are present relevant to the client's concern." },
        { name: "Costs", question: "Value for money spent on services rendered." },
        { name: "Integrity", question: "Provided services with high morale and spirit of honesty." },
        { name: "Assurance", question: "The service was provided by competent personnel." },
        { name: "Outcome", question: "The overall expectations of the client are met." }
    ]

    const ratingOptions = [
        { label: "Strongly Agree", value: 5 },
        { label: "Agree", value: 4 },
        { label: "Neutral", value: 3 },
        { label: "Disagree", value: 2 },
        { label: "Strongly Disagree", value: 1 }
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
        <>
        {formServices.map((service) => (
            <div key={service.name}>
                <h3>{service.name}</h3>
                <p>{service.question}</p>
                <div>
                    {ratingOptions.map((option) => (
                        <label key={option.value}>
                            <Inputs
                                type="radio"
                                name={service.name}
                                value={option.value}
                                checked={formData.serviceRatings?.[service.name] === option.value}
                                onChange={() => handleRatingChange(service.name, option.value)}
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
            </div>
        ))}
        </>
    )
}

export default ClientServiceRatingForm