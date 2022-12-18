import React, { useState, useCallback, useEffect } from "react";
import { allHide } from "./default";

const AppContext = React.createContext(null);

const initialValue = [
  {
    nodeId: "basicInfo",
    label: "Basic Info",
    permission: allHide,
    children: [
      {
        nodeId: "firstName",
        label: "First Name",
        permission: allHide,
      },
      {
        nodeId: "lastName",
        label: "Last Name",
        permission: allHide,
      },
    ],
  },
];

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

  const handleKeyPress = useCallback((event) => {
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
  }, []);

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
