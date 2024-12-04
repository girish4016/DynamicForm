import { iFormStructure } from "../interfaces/formInterface";

const userInformationForm: iFormStructure = {
  fields: [
    { name: "firstName", type: "text", label: "First Name", required: true },
    { name: "lastName", type: "text", label: "Last Name", required: true },
    { name: "age", type: "number", label: "Age", required: false },
    {
      name: "profilePhoto",
      type: "file",
      label: "Profile Photo",
      required: false,
    },
  ],
};

const addressForm: iFormStructure = {
  fields: [
    { name: "street", type: "text", label: "Street", required: true },
    { name: "city", type: "text", label: "City", required: true },
    {
      name: "state",
      type: "dropdown",
      label: "State",
      options: ["California", "Texas", "New York"],
      required: true,
    },
    { name: "zipCode", type: "text", label: "Zip Code", required: false },
  ],
};

const paymentInformationForm: iFormStructure = {
  fields: [
    { name: "cardNumber", type: "text", label: "Card Number", required: true },
    { name: "expiryDate", type: "date", label: "Expiry Date", required: true },
    { name: "cvv", type: "password", label: "CVV", required: true },
    {
      name: "cardholderName",
      type: "text",
      label: "Cardholder Name",
      required: true,
    },
  ],
};

const formStructures: { [key: string]: iFormStructure } = {
  addressForm,
  paymentInformationForm,
  userInformationForm,
};

export default formStructures;
