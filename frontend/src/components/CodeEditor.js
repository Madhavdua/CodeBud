import React, { useState, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import RunCode from "./RunCode";

function CodeEditor(props) {
  const { code, setCode } = props;
  useEffect(() => {
    // Handle initial code value or other effects
  }, []);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    // console.log(newCode);
  };

  return (
    <>
      <MonacoEditor
        value={code}
        onChange={handleCodeChange}
        language="javascript" // Adjust language as needed
        theme="vs-dark" // Optional: Choose a theme
      />
      <RunCode code={code} />
    </>
  );
}
export default CodeEditor;
