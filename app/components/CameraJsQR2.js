"use client";

import React, { useRef, useEffect, useState } from "react";
import jsQR from "jsqr-es6";

const CameraJsQR2 = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [qrCodeText, setQrCodeText] = useState("");

  const resetQrCodeText = () => {
    setQrCodeText("");
  };

  useEffect(() => {
    // カメラへのアクセス
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          scanQRCode();
        })
        .catch((error) => {
          console.error("Error accessing the camera: ", error);
        });
    } else {
      console.error("getUserMedia not supported");
    }
  }, []);

  const scanQRCode = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");

    const scan = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });
        if (code) {
          setQrCodeText(code.data);
        } else {
          setQrCodeText("");
          requestAnimationFrame(scan);
        }
      } else {
        setQrCodeText("");
        requestAnimationFrame(scan);
      }
    };
    scan();
  };

  return (
    <div className="flex flex-col w-1/2 items-center border-2">
      <p className="text-center w-full font-bold text-xl pb-2">use jsQR2</p>
      <video ref={videoRef} style={{ display: "none" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div>
        <video ref={videoRef} width="320" height="240" autoPlay />
      </div>
      <p className="p-5 text-center w-full pt-5 h-20">{qrCodeText}</p>
      <button
        onClick={resetQrCodeText}
        className="bg-red-900 text-white px-2 py-1 mb-2"
      >
        reset
      </button>
    </div>
  );
};

export default CameraJsQR2;
