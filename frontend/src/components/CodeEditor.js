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
      <div className="d-flex" style={{height:"75vh"}}>
        <div className="" style={{flexGrow:1}}>
          <MonacoEditor
            value={code}
            onChange={handleCodeChange}
            language="javascript"
            theme="vs-dark"
            options={{
              automaticLayout: true, // Ensure resizing
            }}
          />
        </div>
      </div>

      {/* <RunCode code={code} /> */}
    </>
  );
}
export default CodeEditor;
