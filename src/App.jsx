import './App.css';
import Shoot from "./components/Shoot.jsx";
import React, {useRef, useEffect, useState} from "react";

function App() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  
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
  

  return <div>
    <nav className="navbar">
      <h1>Memory Booth</h1>
    </nav>
    <div className="view"> 
      <div class="frame">
        <div className="camera">
          <video ref={videoRef}></video>
        </div>
      </div>
    </div>
    <div className="shtbutton">
      <Shoot />
    </div>
  </div>
}

export default App;
