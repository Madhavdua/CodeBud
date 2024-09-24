import React, { useState } from "react";

function SaveCode(props) {
  const { code,setwhite} = props;
  const [fileName, setfileName] = useState("Filename.txt");

  const handleDownload = () => {
    if (code == null || code.length < 5) return;
    const element = document.createElement("a");
    const file = new Blob([code], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = fileName.length > 1 ? fileName : "MyCode.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element); // Clean up
    setTimeout(() => {
      setwhite(null);
    }, 1000);
  };
  return (
    <>
      <div className="save-cont">
        <div className="save-box">
          {/* <label className="my-2">Enter file name</label> */}
          <input
            onChange={(e) => {
              setfileName(e.target.value);
            }}
            value={fileName}
            type="text"
            className="my-2"
            placeholder="Enter file name"
          />
        </div>
        <button onClick={handleDownload} style={{width:"fit-content"}} className="save-button">
          Save
        </button>
      </div>
    </>
  );
}

export default SaveCode;
