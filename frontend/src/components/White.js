import React from "react";
import Output from "./Output";
import ChatResult from "./ChatResult";
import PickFile from "./PickFile";
import SaveCode from './SaveCode'

function White(props) {
  const { output, setwhite, messages, white ,code,setCode} = props;
  return (
    <>
      <div
        className="d-flex "
        style={{
          width: "90vw",
          height: "90vh",
          position: "absolute",
          top: "10px",
          backgroundColor: "transparent",
        }}
      >
        {white==="output" && output && <Output output={output} />}
        {white==="chatresult"  && <ChatResult messages={messages}/>}
        {white==="pickfile" && <PickFile code={code} setCode={setCode} setwhite={setwhite}/>}
        {white==="savefile" && <SaveCode code={code} setwhite={setwhite}/>}
        <button
          className="btn btn-secondary"
          style={{
            width: "40px",
            height: "40px",
            position: "absolute",
            right: "0",
            zIndex: "1000",
          }}
          onClick={() => {
            setwhite(null);
          }}
        >
          X
        </button>
      </div>
    </>
  );
}

export default White;
