import React, { useState } from "react";
import Output from "./Output";
import "./mystyle.css";

function RunCode(props) {
  const serverUrl= process.env.REACT_APP_SERVER_URL||"http://localhost:5000";
  const { setoutput } = props;
  const handleRun = async () => {
    const { code, setwhite } = props;
    try {
      const response = await fetch(`${serverUrl}/run-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code:code }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      //   console.log('Backend response:', data); // Debugging line
      setoutput(data.output);
      if(data.output.length==0){
        setoutput("Nothing to print");
      }
      setwhite("output");
      //   term.current.write(`\r\n${data.output}\r\n`);
      //   console.log('Writing to terminal:', data.output);
    } catch (err) {}
  };
  return (
    <>
      <div className="">
        <button
          className="mine-button"
          onClick={handleRun}
        >
          Run Code
        </button>
        {/* <div className="output-container">
        {output && <Output output={output} />}
      </div> */}
      </div>
    </>
  );
}

export default RunCode;
