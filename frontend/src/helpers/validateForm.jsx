export const validateForm = (formData) => {
    const hasErrors = {}

    if (!formData.selectedService) {
        hasErrors.service = 'Please select a service'
    }

    if (!formData.affiliation) {
        hasErrors.affiliation = 'Please select affiliation'
    }

    if (!formData.age) {
        hasErrors.age = 'Please select age group'
    }

    if (!formData.sex) {
        hasErrors.sex = 'Please select sex'
    }

    if (!formData.address) {
        hasErrors.address = 'Please select address'
    }
    
    if (
        (formData.address === "Within Solano" || formData.address === "Outside Solano") &&
        !formData.specific_location
    ) {
        const msg = formData.address === "Within Solano" 
            ? 'Please select specific location' 
            : 'Please enter municipality'
        hasErrors.specific_location = msg
    }

    if (!formData.employment_status) {
        hasErrors.employment_status = 'Please select employment status'
    }

    const requiredRatings = [
        "Responsiveness", "Reliability", "Access & Facilities",
        "Communication", "Costs", "Integrity", "Assurance", "Outcome"
    ]

    for (const rating of requiredRatings) {
        if (!formData.serviceRatings[rating]) {
            hasErrors[rating] = `Please rate ${rating}`
        }
    }

    return hasErrors
}