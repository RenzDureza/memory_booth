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

  const takePhoto = () => {
    const width = 414;
    const height = width / (16/9);
    
    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.heigh = height;

    let ctx = photo.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);
  }

  return <div>

    <nav className="navbar">
      <h1>Memory Booth</h1>
    </nav>

    <div className="view"> 
      <div className="frame">
        <div className="camera">
          <video ref={videoRef}></video>
        </div>
      </div>
    </div>

    <div className="shtbutton">
      <Shoot onClick={takePhoto}/>
    </div>

  </div>
}

export default App;
