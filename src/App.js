import React, { useState } from 'react';
import * as nifti from 'nifti-reader-js';
import FileUpload from './Components/FileUpload';
import ImageViewer from './Components/ImageViewer';
import Slider from './Components/Slider';
import "./Components/style.css";

const App = () => {
  const [file, setFile] = useState(null);
  const [sliceIndex, setSliceIndex] = useState(0);
  const [maxSliceIndex, setMaxSliceIndex] = useState(0);

  const handleFileSelect = (file) => {
    const reader = new FileReader();
    reader.onload = function () {
      let arrayBuffer = reader.result;
      if (nifti.isCompressed(arrayBuffer)) {
        arrayBuffer = nifti.decompress(arrayBuffer);
      }
      if (nifti.isNIFTI(arrayBuffer)) {
        const niftiHeader = nifti.readHeader(arrayBuffer);
        setFile(arrayBuffer);
        setMaxSliceIndex(niftiHeader.dims[3] - 1);
      } else {
        console.error("The file is not a valid NIfTI file.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <FileUpload onFileSelect={handleFileSelect} />
      {file && <ImageViewer file={file} sliceIndex={sliceIndex} />}
      {file && (
        <Slider
          max={maxSliceIndex}
          value={sliceIndex}
          onChange={(value) => setSliceIndex(parseInt(value))}
        />
      )}
    </div>
  );
};

export default App;
