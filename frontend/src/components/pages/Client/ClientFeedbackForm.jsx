import { useFetchSpecificOffice } from './../../../hooks/useFetchSpecificOffice'

const ClientFeedbackForm = () => {

    const { loading, data } = useFetchSpecificOffice()

    if (loading) return <>Loading...</>
    if (!data || data.error) return <>404 Office not found</>

    return (
        <>
            <p>{data.name}</p>
        </>
    )
}

export default ClientFeedbackForm