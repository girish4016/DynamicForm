import { useState } from "react";
import { ToastContainer } from "react-toastify";

import "./App.css";
import FormComponent from "./components/dynamicForm/formComponent";
import formStructures from "./sampleFormStructures/sampleFormStructure";
import { iFormStructure } from "./interfaces/formInterface";

const forms = {
  addressForm: "Address Form",
  userInformationForm: "User Information Form",
  paymentInformationForm: "Payment Information Form",
};

function App() {
  const [selectedForm, setSelectedForm] = useState("");
  const [loading, setLoading] = useState(false);
  const [formStructure, setFormStructure] = useState<iFormStructure | null>(
    null
  );

  const handleSelectionChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setSelectedForm(selectedValue);

    if (selectedValue) {
      setLoading(true);
      try {
        // can be replaced with actual API calls
        const data = await fetchFormData(selectedValue);
        setFormStructure(data);
      } catch (error) {
        console.error("Failed to fetch form data:", error);
        setFormStructure(null);
      } finally {
        setLoading(false);
      }
    } else {
      setFormStructure(null);
    }
  };

  // Mock API calls based on selected value
  const fetchFormData = async (
    formType: string
  ): Promise<null | iFormStructure> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(formStructures[formType]);
      }, 1000); // Simulate network delay
    });
  };

  return (
    <div className="app">
      <header>
        <h1 className="nav-heading">Dynamic Form</h1>
      </header>
      <div className="form-select">
        <label htmlFor="form-selector">Select a Form:</label>
        <select
          id="form-selector"
          value={selectedForm}
          onChange={handleSelectionChange}
        >
          <option value="">-- Select a Form --</option>
          {Object.entries(forms).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {loading && <div className="loading">Loading...</div>}

      {formStructure && !loading && (
        <FormComponent formStructure={formStructure} />
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
