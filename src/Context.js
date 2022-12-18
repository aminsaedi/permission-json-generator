import React, { useState, useCallback, useEffect } from "react";
import { allHide } from "./default";

const AppContext = React.createContext(null);

const initialValue = [
  {
    nodeId: "basicInfo",
    label: "Basic Info",
    permission: allHide,
    children: [
      { nodeId: "firstName", label: "First Name", permission: allHide },
      { nodeId: "lastName", label: "Last Name", permission: allHide },
      { nodeId: "middleName", label: "Middle Name", permission: allHide },
      { nodeId: "nickName", label: "Nickname", permission: allHide },
    ],
  },
  {
    nodeId: "humanResources",
    label: "Human Resources",
    permission: allHide,
    children: [
      {
        nodeId: "skills",
        label: "Skills",
        permission: allHide,
      },
      {
        nodeId: "licenses",
        label: "Licenses",
        permission: allHide,
      },
      {
        nodeId: "assets",
        label: "Assets",
        permission: allHide,
      },
      {
        nodeId: "safety",
        label: "Safety",
        permission: allHide,
      },
      {
        nodeId: "actionAndRewards",
        label: "Action and Rewards",
        permission: allHide,
      },
      {
        nodeId: "otherEvents",
        label: "Other Events",
        permission: allHide,
      },
      {
        nodeId: "training",
        label: "Training",
        permission: allHide,
      },
      {
        nodeId: "education",
        label: "Education",
        permission: allHide,
      },
      {
        nodeId: "criminalRecord",
        label: "Criminal Record",
        permission: allHide,
      },
      {
        nodeId: "references",
        label: "References",
        permission: allHide,
      },
      {
        nodeId: "previousEmployment",
        label: "Previous Employment",
        permission: allHide,
      },
    ],
  },
  {
    nodeId: "benefits",
    label: "Benefits",
    permission: allHide,
  },
  {
    nodeId: "personalInfo",
    label: "Personal Info",
    permission: allHide,
    children: [
      {
        nodeId: "generalInfo",
        label: "General Info",
        permission: allHide,
      },
      {
        nodeId: "address",
        label: "Address",
        permission: allHide,
      },
      {
        nodeId: "paymentInfo",
        label: "Payment Info",
        permission: allHide,
        children: [
          {
            nodeId: "paymentMethod",
            label: "Payment Method",
            permission: allHide,
          },
          {
            nodeId: "bankAccount",
            label: "Bank Account",
            permission: allHide,
          },
        ],
      },
      {
        nodeId: "organizationProperties",
        label: "Organization Properties",
        permission: allHide,
      },
      {
        nodeId: "digitalIds",
        label: "Digital Ids",
        permission: allHide,
      },
      {
        nodeId: "otherIds",
        label: "Other Ids",
        permission: allHide,
      },

      {
        nodeId: "nonResident",
        label: "Non Resident",
        permission: allHide,
        children: [
          {
            nodeId: "nonResidentSwitch",
            label: "Non Resident Switch",
            permission: allHide,
          },
          {
            nodeId: "alertDate",
            label: "Alert Date",
            permission: allHide,
          },
          {
            nodeId: "visaExpirationDate",
            label: "Visa Expiration Date",
            permission: allHide,
          },
          {
            nodeId: "visaType",
            label: "Visa Type",
            permission: allHide,
          },
          {
            nodeId: "statusReviewDate",
            label: "Status Review Date",
            permission: allHide,
          },
          {
            nodeId: "visaNumber",
            label: "Visa Number",
            permission: allHide,
          },
          {
            nodeId: "passportNumber",
            label: "Passport Number",
            permission: allHide,
          },
          {
            nodeId: "passportExpirationDate",
            label: "Passport Expiration Date",
            permission: allHide,
          },
          {
            nodeId: "passportCountry",
            label: "Passport Country",
            permission: allHide,
          },
          {
            nodeId: "notes",
            label: "Notes",
            permission: allHide,
          },
        ],
      },
    ],
  },
  {
    nodeId: "compensation",
    label: "Compensation",
    permission: allHide,
    children: [
      {
        nodeId: "employer",
        label: "Employer",
        permission: allHide,
      },
      {
        nodeId: "employerBusinessNumber",
        label: "Employer Business Number",
        permission: allHide,
      },
      {
        nodeId: "holidayCalendar",
        label: "Holiday Calendar",
        permission: allHide,
      },
      {
        nodeId: "employmentType",
        label: "Employment Type",
        permission: allHide,
      },
      {
        nodeId: "payCalendar",
        label: "Pay Calendar",
        permission: allHide,
      },
      {
        nodeId: "payRate",
        label: "Pay Rate",
        permission: allHide,
      },
      {
        nodeId: "trackingSegment",
        label: "Tracking Segment",
        permission: allHide,
      },
      {
        nodeId: "standardHoursPerDay",
        label: "Standard Hours Per Day",
        permission: allHide,
      },
    ],
  },
  {
    nodeId: "contactAndFamily",
    label: "Contact and Family",
    permission: allHide,
  },
  {
    nodeId: "payItems",
    label: "Pay Items",
    permission: allHide,
  },
  {
    nodeId: "Documents",
    label: "Documents",
    permission: allHide,
  },
  {
    nodeId: "notes",
    label: "Notes",
    permission: allHide,
  },
];

const getPathToRoot = (nodeId, tree) => {
  const path = [];
  let currentNode = tree.find((node) => node.nodeId === nodeId);
  while (currentNode) {
    path.push(currentNode);
    currentNode = tree.find((node) => node.nodeId === currentNode.parentId);
  }
  return path;
};

/*
-basicInfo
  -firstName
  -lastName
  -middleName
  -nickName
-humanResources
  -skills
  -licenses
  -assets
  -safety
  -actionAndRewards
  -otherEvents
  -training
  -education
  -criminalRecord
  -references
  -previousEmployment
-benefits
-personalInfo
  -generalInfo
  -address
  -paymentInfo
    -paymentMethod
    -bankAccount
  -organizationProperties
  -digitalIds
  -otherIds
  -nonResident
    -nonResidentSwitch
    -alertDate
    -visaExpirationDate
    -visaType
    -statusReviewDate
    -visaNumber
    -passportNumber
    -passportExpirationDate
    -passportCountry
    -notes
-compensation
  -employer
  -employerBusinessNumber
  -holidayCalendar
  -employmentType
  -payCalendar
  -payRates
  -trackingSegment
  -standardHoursPerDay
  -standardHoursPerPay
  -excludeAttendanceFromPay
  -secondaryPayRate
-taxation
  -taxFormulas
  -taxMethodForBonus
  -federalTax
  -stateTax
-groups
  -group
  -union
-preferences
  -preferences
  -notifications
  -loginAndRecovery
  -accessPermissions
-contactAndFamily
-payItems
-documents
-notes 
*/

export const Provider = ({ children }) => {
  const [nodeId, setNodeId] = useState();
  const [values, setValues] = useState(initialValue);

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        setValues(data);
      };
    }
  };

  const handleDownload = () => {
    const data = JSON.stringify(values);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "data.json";
    link.href = url;
    link.click();
  };

  const handleReset = () => {
    setValues(initialValue);
  };

  const handleEditorChange = (text) => {
    try {
      const parssed = JSON.parse(text);
      if (Array.isArray(parssed)) setValues(parssed);
    } catch (error) {}
  };

  const handleKeyPress = useCallback(
    (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "s") {
        event.preventDefault();
        handleDownload();
      }
      if ((event.metaKey || event.ctrlKey) && event.key === "o") {
        event.preventDefault();
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";
        input.onchange = handleUpload;
        input.click();
      }
    },
    [handleDownload]
  );

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const value = {
    nodeId,
    setNodeId,
    values,
    setValues,
    handleUpload,
    handleDownload,
    handleReset,
    handleEditorChange,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => React.useContext(AppContext);
