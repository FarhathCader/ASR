import React, { useState } from "react";
import AudioRecorder from "./AudioRecorder.jsx";

function App() {
  const [transcription, setTranscription] = useState("");
  const [summary, setSummary] = useState("");

  const handleTranscribed = (data) => {
    setTranscription(data.transcription);
    setSummary(data.summary);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🩺 Medical STT App (Doctor–Patient)</h1>
      <AudioRecorder onTranscribed={handleTranscribed} />
      <h2>📝 Transcription:</h2>
      <p style={{ whiteSpace: "pre-wrap", border: "1px solid #ccc", padding: "10px" }}>
        {transcription || "No transcription yet..."}
      </p>
      <h2>💡 Medical Note (Summary):</h2>
      <p style={{ whiteSpace: "pre-wrap", border: "1px solid #ccc", padding: "10px" }}>
        {summary || "No summary yet..."}
      </p>
    </div>
  );
}

export default App;
