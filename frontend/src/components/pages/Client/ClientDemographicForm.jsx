const ClientDemographicForm = () => {

    const Affiliation = [ "General Public", "Government (Within LGU)", "Government (Other Offices/Agencies)"]
    const AgeGroup = ["17 and below", "18-29", "30-39", "40-49", "50-59", "60 and above"]
    const Sex = ["Male", "Female"]
    const Address = ["Within Solano", "Outside Solano"]
    const Employment_Status = ["Employed", "Unemployed", "Self-Unemployed"]

    return (
        <>
        <ul>
            <h1>Affiliation</h1>
            {Affiliation.map((aff, index) => (
                <li key={index}>
                    <label>
                        <input type="radio" name="affiliation" value={aff} />
                        {aff}
                    </label>
                </li>
            ))}
        </ul>

        <ul>
            <h1>Age Group</h1>
            {AgeGroup.map((age, index) => (
                <li key={index}>
                    <label>
                        <input type="radio" name="age" value={age} />
                        {age}
                    </label>
                </li>
            ))}
        </ul>

        <ul>
            <h1>Sex</h1>
            {Sex.map((sex, index) => (
                <li key={index}>
                    <label>
                        <input type="radio" name="sex" value={sex} />
                        {sex}
                    </label>
                </li>
            ))}
        </ul>

        <ul>
            <h1>Address</h1>
            {Address.map((address, index) => (
                <li key={index}>
                    <label>
                        <input type="radio" name="address" value={address} />
                        {address}
                    </label>
                </li>
            ))}
        </ul>

        <ul>
            <h1>Employment Status</h1>
            {Employment_Status.map((emp, index) => (
                <li key={index}>
                    <label>
                        <input type="radio" name="employment_status" value={Employment_Status} />
                        {emp}
                    </label>
                </li>
            ))}
        </ul>
        </>
    )
}

export default ClientDemographicForm