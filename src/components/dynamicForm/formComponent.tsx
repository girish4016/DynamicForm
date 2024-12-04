import React, { useState } from "react";

import "./formComponent.css";
import { iFormStructure } from "../../interfaces/formInterface";
import { toast } from "react-toastify";

interface FormData {
  [key: string]: string | number | boolean | File | null; // Dynamic keys with specific value types
}

const FormComponent = ({
  formStructure,
}: {
  formStructure: iFormStructure;
}) => {
  // Initialize formData dynamically based on addressForm
  const initialFormData: FormData = formStructure.fields.reduce(
    (acc, field) => {
      acc[field.name] =
        field.type === "checkbox" ? false : field.type === "file" ? null : ""; // Default values
      return acc;
    },
    {} as FormData
  );

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (e: any) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0] || null
          : value,
    });
  };

  const totalFields = Object.keys(formData).length;
  const filledFields = Object.values(formData).filter((value) => value).length;
  const progress = (filledFields / totalFields) * 100;

  const handleSubmit = (e: any) => {
    e.preventDefault(); // Form submission logic
    toast.success("Form submitted");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="progress-bar">
          <div
            className="progress-bar-filled"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        {formStructure.fields.map((field) => {
          if (field?.type === "file") {
            return (
              <React.Fragment key={field?.name}>
                <label htmlFor={field?.name}>
                  {field?.label}:{" "}
                  {field?.required ? (
                    <span className="field-required">*</span>
                  ) : (
                    ""
                  )}
                </label>
                <input
                  type="file"
                  name={field?.name}
                  key={field?.name}
                  id={field?.name}
                  required={field?.required}
                  onChange={handleChange}
                />
              </React.Fragment>
            );
          }
          if (field?.type === "dropdown") {
            return (
              <React.Fragment key={field?.name}>
                <label htmlFor={field?.name}>
                  {field?.label}:{" "}
                  {field?.required ? (
                    <span className="field-required">*</span>
                  ) : (
                    ""
                  )}
                </label>
                <select
                  name={field?.name}
                  key={field?.name}
                  id={field?.name}
                  value={formData[field?.name] as string}
                  required={field?.required}
                  onChange={handleChange}
                >
                  <option value="">Select an option</option>
                  {field?.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </React.Fragment>
            );
          }
          if (field?.type === "checkbox") {
            return (
              <React.Fragment key={field?.name}>
                <label htmlFor={field?.name}>
                  {field?.label}:{" "}
                  {field?.required ? (
                    <span className="field-required">*</span>
                  ) : (
                    ""
                  )}
                </label>
                <input
                  type="checkbox"
                  name={field?.name}
                  key={field?.name}
                  id={field?.name}
                  checked={formData[field?.name] as boolean}
                  required={field?.required}
                  onChange={handleChange}
                />
              </React.Fragment>
            );
          }
          if (field?.type === "radio") {
            return (
              <React.Fragment key={field?.name}>
                <label>
                  {field?.label}:{" "}
                  {field?.required ? (
                    <span className="field-required">*</span>
                  ) : (
                    ""
                  )}
                </label>
                {field?.options?.map((option) => {
                  return (
                    <React.Fragment key={field?.name}>
                      <input
                        type="radio"
                        name={field?.name}
                        value={option}
                        checked={formData[field?.name] === option}
                        required={field?.required}
                        onChange={handleChange}
                      />
                      {option}
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            );
          }

          if (field?.type === "textarea") {
            return (
              <React.Fragment key={field?.name}>
                <label htmlFor={field?.name}>
                  {field?.label}:{" "}
                  {field?.required ? (
                    <span className="field-required">*</span>
                  ) : (
                    ""
                  )}
                </label>
                <textarea
                  name={field?.name}
                  key={field?.name}
                  value={formData[field?.name] as string}
                  required={field?.required}
                  onChange={handleChange}
                ></textarea>
              </React.Fragment>
            );
          }
          return (
            <React.Fragment key={field?.name}>
              <label htmlFor={field?.name}>
                {field?.label}:{" "}
                {field?.required ? (
                  <span className="field-required">*</span>
                ) : (
                  ""
                )}
              </label>
              <input
                type={field?.type}
                name={field?.name}
                id={field?.name}
                value={formData[field?.name] as string}
                required={field?.required}
                onChange={handleChange}
              />
            </React.Fragment>
          );
        })}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;
