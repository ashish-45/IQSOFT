import React from "react";
import './style.css';

const FileUpload = ({ onFileSelect }) => {
  const handleFileChange = (event) => {
    onFileSelect(event.target.files[0]);
  };

  return (
    <div>
      <h4>Image Reader</h4>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;
