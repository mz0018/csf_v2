import { useFetchSpecificOffice } from './../../../hooks/useFetchSpecificOffice'

const ClientFeedbackForm = () => {

    const { loading, data } = useFetchSpecificOffice()

    if (loading) return <>Loading...</>
    if (!data || data.error) return <>404 Office not found</>

    return (
        <>
            <p>{data.name}</p>

            {data.services && data.services.length > 0 && (
                <>
                <ul>
                    {data.services.map((service, index) => (
                        typeof service === 'string' ? (
                            <li key={index}>{service}</li>
                        ) : (
                            <li key={index}>
                                {service.name}
                                {service.sub_services && (
                                    <ul>
                                        {service.sub_services.map((sub, i) => (
                                            <li key={i}>{sub}</li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        )
                    ))}
                </ul>
                </>
            )}
        </>
    )
}

export default ClientFeedbackForm