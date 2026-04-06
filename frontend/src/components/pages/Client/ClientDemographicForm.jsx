import { Inputs } from '../../ui/Inputs'

const ClientDemographicForm = ({ formData, setFormData }) => {
  const Affiliation = ["General Public", "Government (Within LGU)", "Government (Other Offices/Agencies)"];
  const AgeGroup = ["17 and below", "18-29", "30-39", "40-49", "50-59", "60 and above"];
  const Sex = ["Male", "Female"];
  const Address = ["Within Solano", "Outside Solano"];
  const Employment_Status = ["Employed", "Unemployed", "Self-Unemployed"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <ul>
        <h1>Affiliation</h1>
        {Affiliation.map((aff, i) => (
          <li key={i}>
            <label>
              <Inputs
                type="radio"
                name="affiliation"
                value={aff}
                checked={formData.affiliation === aff}
                onChange={handleChange}
              />
              {aff}
            </label>
          </li>
        ))}
      </ul>

      <ul>
        <h1>Age Group</h1>
        {AgeGroup.map((age, i) => (
          <li key={i}>
            <label>
              <Inputs
                type="radio"
                name="age"
                value={age}
                checked={formData.age === age}
                onChange={handleChange}
              />
              {age}
            </label>
          </li>
        ))}
      </ul>

      <ul>
        <h1>Sex</h1>
        {Sex.map((sex, i) => (
          <li key={i}>
            <label>
              <Inputs
                type="radio"
                name="sex"
                value={sex}
                checked={formData.sex === sex}
                onChange={handleChange}
              />
              {sex}
            </label>
          </li>
        ))}
      </ul>

      <ul>
        <h1>Address</h1>
        {Address.map((addr, i) => (
          <li key={i}>
            <label>
              <Inputs
                type="radio"
                name="address"
                value={addr}
                checked={formData.address === addr}
                onChange={handleChange}
              />
              {addr}
            </label>
          </li>
        ))}
      </ul>

      <ul>
        <h1>Employment Status</h1>
        {Employment_Status.map((emp, i) => (
          <li key={i}>
            <label>
              <Inputs
                type="radio"
                name="employment_status"
                value={emp}
                checked={formData.employment_status === emp}
                onChange={handleChange}
              />
              {emp}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ClientDemographicForm;