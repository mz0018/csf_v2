import { Inputs } from '../../ui/Inputs'
import { ErrorMessage } from '../../ui/ErrorMessage';

const ClientDemographicForm = ({ formData, setFormData, errors, clearError }) => {
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

  const handleChange = (name, value) => {

    clearError(name)

    if (name === "address") {
      setFormData(prev => ({ ...prev, address: value, specific_location: '' }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  };

  return (
    <div className="space-y-4">
      {formSections.map((section, idx) => (
        <ul key={idx} className="">
          <h1>{section.title}</h1>
          {section.options.map((option, i) => (
            <li key={i}>
              <label className="inline-flex items-center gap-2">
                <Inputs
                  type="radio"
                  name={section.name}
                  value={option}
                  checked={formData[section.name] === option}
                  onChange={(e) => handleChange(section.name, e.target.value)}
                />
                {option}
              </label>
            </li>
          ))}
          <ErrorMessage message={errors[section.name]} />
        </ul>
      ))}

      {formData.address === "Within Solano" && (
        <>
          <select 
            name="specific_location"
            value={formData.specific_location || ""}
            onChange={(e) => handleChange('specific_location', e.target.value)}
            >
              <option value="">Select Barangay</option>
              {solanoBarangays.map(brgy => (
                <option key={brgy} value={brgy}>{brgy}</option>
              ))}
          </select>
          <ErrorMessage message={errors.specific_location} />
        </>
      )}

      {formData.address === "Outside Solano" && (
        <>
          <Inputs
            name="specific_location"
            value={formData.specific_location || ""}
            onChange={(e) => handleChange('specific_location', e.target.value)}
            placeholder="Enter Municipality"
          />
          <ErrorMessage message={errors.specific_location} />
        </>
      )}
    </div>
  );
};

export default ClientDemographicForm;