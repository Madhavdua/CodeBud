import React from "react";
import './mystyle.css'
function PickFile(props) {
    const {code, setCode}=props;
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target.result); // Set the file content to state
      };
      reader.readAsText(file); // Read the file as text
    }
  };
  return (
    <>
      <label htmlFor="file">Choose a file</label>
      <input className="inputfile" id="file" name="file" type="file" onChange={handleFileChange}  accept=".txt, .doc,.docx,.js , .html, .css, .java" />
    </>
  );
}

export default PickFile;
