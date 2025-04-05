import './App.css';
import React, {useRef, useEffect, useState} from "react";

function App() {
  const videoRef = useRef(null);
  const photoRef1 = useRef(null);
  const photoRef2 = useRef(null);
  const photoRef3 = useRef(null);
  const photoRef4 = useRef(null);
  const [shotIndex, setShotIndex] = useState(0);
  const [shotsTaken, setShotsTaken] = useState([false,false,false,false]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 500, height: 500 }
      })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
    .catch(err => {
        console.error(err);
      })
  }

  useEffect(() => {
    getVideo()
  }, [videoRef]);

  const takePhoto = () => {
    const width = 405;
    const height = 210;
    const canvasRefs = [photoRef1, photoRef2, photoRef3, photoRef4];
    
    if (shotIndex < 4) {
      const canvas = canvasRefs[shotIndex].current;
      const video = videoRef.current;

      if (!canvas || !video) return;

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, width, height);

      const updateShots = [...shotsTaken];
      updateShots[shotIndex] = true;
      setShotsTaken(updateShots);

      setShotIndex(shotIndex + 1);

    }
  }

  return <div>

    <nav className="navbar">
      <h1>Memory Booth</h1>
    </nav>

    <div className="view"> 
      <div class="side left">
        <canvas ref={photoRef3} className={shotsTaken[2] ? "taken" : ""}></canvas> 
        <canvas ref={photoRef4} className={shotsTaken[3] ? "taken" : ""}></canvas> 
      </div>

      <div className="frame">
        <div className="camera">
          <video ref={videoRef} autoPlay playsInline></video>
        </div>
      </div>

      <div class="side right">
        <canvas ref={photoRef1} className={shotsTaken[0] ? "taken" : ""}></canvas> 
        <canvas ref={photoRef2} className={shotsTaken[1] ? "taken" : ""}></canvas> 
      </div>
    </div>

    <div className="shtbutton">
       <button className="shoot" onClick={takePhoto}>
        Shoot
      </button>
     </div>

  </div>
}

export default App;
