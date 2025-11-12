import React, { useState, useRef } from "react";

function AudioRecorder({ onTranscribed }) {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (e) => {
      chunks.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = async () => {
      const blob = new Blob(chunks.current, { type: "audio/wav" });
      chunks.current = [];
      const url = URL.createObjectURL(blob);
      setAudioURL(url);

      const formData = new FormData();
      formData.append("file", blob, "recording.wav");

      const res = await fetch("http://localhost:8000/transcribe/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      onTranscribed(data);
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div>
      <button onClick={startRecording} disabled={recording}>
        🎙️ Start Recording
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        ⏹️ Stop Recording
      </button>

      {audioURL && (
        <div>
          <h3>Preview:</h3>
          <audio src={audioURL} controls />
        </div>
      )}
    </div>
  );
}

export default AudioRecorder;
