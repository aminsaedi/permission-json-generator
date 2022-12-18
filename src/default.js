// first key => token role
// second key => profile role
export const allHide = {
  ORG_ADMIN: {
    EMPLOYEE: "CRUD",
    CUSTOMER: "CRUD",
    PAYEE: "CRUD",
  },
};

export const roles = [
  {
    key: "ORG_ADMIN",
    label: "Organization Admin",
  },
  {
    key: "EMPLOYEE",
    label: "Employee",
  },
  {
    key: "SUPERVISOR",
    label: "Supervisor",
  },
  {
    key: "HR_MANAGER",
    label: "HR Manager",
  },
  {
    key: "PAY_MANAGER",
    label: "PAY_MANAGER",
  },
  {
    key: "CUSTOMER",
    label: "Customer",
  },
  {
    key: "PAYEE",
    label: "Payee",
  },
];

export const editableRoles = [
  {
    key: "EMPLOYEE",
    label: "Employee",
  },
  {
    key: "CUSTOMER",
    label: "Customer",
  },
  {
    key: "PAYEE",
    label: "Payee",
  },
];

export const accessLevels = [
  {
    key: "CRUD",
    label: "Full Access",
  },
  {
    key: "R",
    label: "Read Only",
  },
  {
    key: "RW",
    label: "Read & Modify",
  },
  {
    key: "RWD",
    label: "Read & Modify & Delete",
  },
  {
    key: "H",
    label: "Hidden",
  },
];
