import { Inputs } from '../../ui/Inputs'

const ClientDemographicForm = ({ formData, setFormData }) => {
  const formSections = [
    {
      title: "Affiliation",
      name: "affiliation",
      options: ["General Public", "Government (Within LGU)", "Government (Other Offices/Agencies)"]
    },
    {
      title: "Age Group",
      name: "age",
      options: ["17 and below", "18-29", "30-39", "40-49", "50-59", "60 and above"]
    },
    {
      title: "Sex",
      name: "sex",
      options: ["Male", "Female"]
    },
    {
      title: "Address",
      name: "address",
      options: ["Within Solano", "Outside Solano"]
    },
    {
      title: "Employment Status",
      name: "employment_status",
      options: ["Employed", "Unemployed", "Self-Unemployed"]
    }
  ];

  const solanoBarangays = [
    "Aggub",
    "Bagahabag",
    "Bangaan",
    "Bangar",
    "Bascaran",
    "Communal",
    "Concepcion",
    "Curifang",
    "Dadap",
    "Lactawan",
    "Osmeña",
    "Quezon",
    "Roxas",
    "San Juan",
    "San Luis",
    "Tucal",
    "Uddiawan",
    "Wacal"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "address") {
      setFormData(prev => ({ ...prev, address: value, specific_location: '' }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  };

  return (
    <>
      {formSections.map((section, idx) => (
        <ul key={idx}>
          <h1>{section.title}</h1>
          {section.options.map((option, i) => (
            <li key={i}>
              <label>
                <Inputs
                  type="radio"
                  name={section.name}
                  value={option}
                  checked={formData[section.name] === option}
                  onChange={handleChange}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      ))}

      {formData.address === "Within Solano" && (
        <div>
          <select 
            name="specific_location"
            value={formData.specific_location || ""}
            onChange={handleChange}
            >
              <option value="">Select Barangay</option>
              {solanoBarangays.map(brgy => (
                <option key={brgy} value={brgy}>{brgy}</option>
              ))}
          </select>
        </div>
      )}

      {formData.address === "Outside Solano" && (
        <div>
          <select 
            name="specific_location"
            value={formData.specific_location || ""}
            onChange={handleChange}
            >
              <option value="">Select Municipality</option>
              <option value="aritao">Aritao</option>
              <option value="bambang">Bambang</option>
              <option value="bayombong">Bayombong</option>
              <option value="santa fe">Sta.fe</option>
          </select>
        </div>
      )}
    </>
  );
};

export default ClientDemographicForm;