import React from "react";

function SaveCode(props) {
  const { code, fileName, setfileName } = props;

  const handleDownload = () => {
    if (code == null || code.length < 5) return;
    const element = document.createElement("a");
    const file = new Blob([code], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = fileName.length > 1 ? fileName : "MyCode.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element); // Clean up
  };
  return (
    <>
      <div style={{display:"flex", flexDirection:"column",alignItems:"center",  margin:"20px 0px" }}>
        <div
          style={{
            display: "flex",
            margin: "15px 0px",
            justifyContent: "space-between",
          }}
        >
          <label>Enter file name</label>
          <input
            onChange={(e) => {
              setfileName(e.target.value);
            }}
            value={fileName}
            type="text"
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
