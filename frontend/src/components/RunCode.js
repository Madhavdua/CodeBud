import React, { useState } from "react";
import Output from "./Output";
import "./mystyle.css";

function RunCode(props) {
  const [output, setoutput] = useState(null);
  const handleRun = async () => {
    const { code } = props;
    try {
      const response = await fetch("http://localhost:5000/run-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      //   console.log('Backend response:', data); // Debugging line
      setoutput(data.output);
      //   term.current.write(`\r\n${data.output}\r\n`);
      //   console.log('Writing to terminal:', data.output);
    } catch (err) {}
  };
  return (
    <>
    <div className="my-2 d-flex px-2" >
      <button className="run-code-button" onClick={handleRun}>
        Run Code
      </button>
      <div className="output-container">
        {output && <Output output={output} />}
      </div>

    </div>
    </>
  );
}

export default RunCode;
