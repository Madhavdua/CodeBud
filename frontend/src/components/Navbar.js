import React, { useEffect, useState } from "react";
import ChatInterface from "./ChatInterface";
import PickFile from "./PickFile";
import RunCode from "./RunCode";
import "./mystyle.css";

function Navbar(props) {
  const [runnable, setrunnable] = useState(false);

  const { handleSend, code, setoutput, setwhite, setMessages } = props;
  const handleAnalyze = () => {
    let msg = `Analyze this code block: ${code}`;
    setwhite("chatresult");
    handleSend(msg);
  };
  useEffect(() => {
    if (!runnable) {
      if (code && code.length > 5) {
        setrunnable(true);
      }
    } else if (code.length < 6) {
      setrunnable(false);
    }
  }, [code]);
  const handlePick = () => {
    setwhite("pickfile");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
        <img className="navbar-brand" src="./cb1.png" width="40px"/>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <ChatInterface handleSend={handleSend} setwhite={setwhite} />
              </li>
              {runnable && (
                <li className="nav-item">
                  <RunCode
                    code={code}
                    setoutput={setoutput}
                    setwhite={setwhite}
                  />
                </li>
              )}
              {runnable && (
                <li>
                  <button className="mine-button" onClick={handleAnalyze}>
                    Analyze Code
                  </button>
                </li>
              )}
              <li className="nav-item">
                <button className="mine-button " onClick={handlePick}>
                  Pick file
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="mine-button nav-link"
                  onClick={() => setwhite("savefile")}
                >
                  Save Code
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;