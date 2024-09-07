import React, { useEffect } from 'react';

const VoiceAssistant = () => {
  useEffect(() => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      console.log('Speech received: ' + speechResult);
      // Send speechResult to backend and get response
    };

    recognition.onspeechend = () => {
      recognition.stop();
    };

    recognition.onerror = (event) => {
      console.log('Error occurred in recognition: ' + event.error);
    };

    document.getElementById('start-record-btn').addEventListener('click', () => {
      recognition.start();
    });
  }, []);

  return (
    <div>
      <button id="start-record-btn">Start Recording</button>
    </div>
  );
};

export default VoiceAssistant;