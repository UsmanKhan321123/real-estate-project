import React, { useState, useRef, useEffect } from "react";

const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;

    console.log(cloudinaryRef.current);
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dlr1pcvhn",
        uploadPreset: "cloudinaryUploadPreset",
      },
      (error, result) => {
        console.log(result);
      },
    );
  }, []);
  return (
    <div>
      <button onClick={()=>{widgetRef.current.open()}}>Upload</button>
    </div>
  );
};

export default UploadWidget;
