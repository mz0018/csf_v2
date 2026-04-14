import { useRef, useEffect } from 'react'

export const feedbackAutoScrollError = (errors) => {
    const refs = {
        service: useRef(null),
        affiliation: useRef(null),
        age: useRef(null),
        sex: useRef(null),
        address: useRef(null),
        specific_location: useRef(null),
        employment_status: useRef(null),
        responsiveness: useRef(null),
        reliability: useRef(null),
        access_facilities: useRef(null),
        communication: useRef(null),
        costs: useRef(null),
        integrity: useRef(null),
        assurance: useRef(null),
        outcome: useRef(null)
    }

    useEffect(() => {
        const firstErrorField = Object.keys(errors).find(
            key => errors[key]
        )

        if (firstErrorField && refs[firstErrorField]?.current) {
            refs[firstErrorField].current.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
            refs[firstErrorField].current.focus()
        }

    }, [errors])

    return refs

}