import React, { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import VoiceAssistant from './components/VoiceAssistant';
import ChatInterface from './components/ChatInterface';
import './App.css';
import SaveCode from './components/SaveCode';
import PickFile from './components/PickFile';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [code, setCode] = useState('');
  const [fileName, setfileName] = useState('MyCode.txt');

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLearningMode = () => {
    // Send learning mode prompt to backend
  };

  const handleDevelopmentMode = () => {
    // Send development mode prompt to backend
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <div className="content">
        <div className="editor-container">
          <CodeEditor code={code} setCode={setCode} />
        </div>
        <div className="chat-interface">
          <ChatInterface />
          <div className="button-container">
            <button className="mode-button" onClick={handleLearningMode}>
              Learning Mode
            </button>
            <button className="mode-button" onClick={handleDevelopmentMode}>
              Development Mode
            </button>
          </div>
          <VoiceAssistant />
          <SaveCode code={code} fileName={fileName} setfileName={setfileName}/>
          <PickFile code={code} setCode={setCode}/>
        </div>
      </div>
    </div>
  );
}

export default App;