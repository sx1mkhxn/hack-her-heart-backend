import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import './App.css';

const sendLoveVirus = async () => {
  try {
    const response = await fetch(
      'https://hack-her-heart-backend.onrender.com', 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: '+917838073250' }) // Replace with her number
      }
    );
    alert(await response.text());
  } catch (error) {
    alert("Failed to send love virus 😢");
  }
}

function App() {
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    // Fake "scanning" animation
    const interval = setInterval(() => {
      setScanProgress(prev => (prev >= 100 ? 100 : prev + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scanProgress === 100) {
      confetti({ particleCount: 200, spread: 70 });
    }
  }, [scanProgress]);

  return (
    <div className="App">
      <h1>💖 LOVE_VIRUS SCAN IN PROGRESS... 💖</h1>
      <div className="virus-scan">
        <p>Scanning heart for vulnerabilities...</p>
        <progress value={scanProgress} max="100" />
        <p>Threat detected: <span className="threat">Irresistible love for YOU</span></p>
        <p>Status: <span className="infected">INFECTED</span></p>
        <button 
          onClick={() => {
            confetti();
            sendLoveVirus();
            alert("💌 Love virus installed successfully. Reboot your heart? ❤️");
          }}
          className="love-button"
        >
          ACCEPT LOVE
        </button>
      </div>
    </div>
  );
}

export default App;