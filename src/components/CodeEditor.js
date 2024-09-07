import React, { useState, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';

function CodeEditor() {
  const [code, setCode] = useState('');

  useEffect(() => {
    // Handle initial code value or other effects
  }, []);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    console.log(newCode);
  };

  return (
    <MonacoEditor
      value={code}
      onChange={handleCodeChange}
      language="javascript" // Adjust language as needed
      theme="vs-dark" // Optional: Choose a theme
    />
  );
}
export default CodeEditor;