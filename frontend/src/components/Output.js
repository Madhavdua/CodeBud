import React from "react";

function Output(props) {
  return (
    <>
      <div
        style={{
          width: "90vw",
          minHeight: "300px",
          height:"fit-content", // Set a fixed height for scrolling
          padding: "5px",
          overflowY: "auto", // Enable vertical scrolling
          backgroundColor: "black",
          color: "white",
          border: "1px solid #ccc", // Optional: Add border to visually separate the area
          borderRadius: "5px", // Optional: Rounded corners
        }}
        className="bg-dark text-light"
      >
        {props.output}
      </div>
    </>
  );
}

export default Output;
