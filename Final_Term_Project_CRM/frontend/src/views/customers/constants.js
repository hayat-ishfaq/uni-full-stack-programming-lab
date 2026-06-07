export const customerControls = [
  {
    name: "name",
    label: "Name",
    placeholder: "Enter customer name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter customer email",
    componentType: "input",
    type: "email",
  },
  {
    name: "phone",
    label: "Phone",
    placeholder: "Enter phone number",
    componentType: "input",
    type: "tel",
  },
  {
    name: "company",
    label: "Company",
    placeholder: "Enter company name",
    componentType: "input",
    type: "text",
  },
  {
    name: "status",
    label: "Status",
    placeholder: "Select status",
    componentType: "select",
    options: [
      { id: "Lead", label: "Lead" },
      { id: "Active", label: "Active" },
      { id: "Inactive", label: "Inactive" },
    ],
  },
];
