import React, { useEffect, useRef } from 'react';
import * as nifti from 'nifti-reader-js';
import './style.css';

const ImageViewer = ({ file, sliceIndex }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!file) return;

    let niftiHeader, niftiImage;

    try {
      if (nifti.isCompressed(file)) {
        file = nifti.decompress(file);
      }

      if (nifti.isNIFTI(file)) {
        niftiHeader = nifti.readHeader(file);
        niftiImage = nifti.readImage(niftiHeader, file);
      } else {
        console.error("The file is not a valid NIfTI file.");
        return;
      }
    } catch (error) {
      console.error("Error processing NIfTI file:", error);
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const { dims } = niftiHeader;
    const nx = dims[1];
    const ny = dims[2];
    const nz = dims[3];

    if (sliceIndex >= nz) return;

    const slice = new Uint8Array(nx * ny);

    for (let x = 0; x < nx; x++) {
      for (let y = 0; y < ny; y++) {
        slice[x + y * nx] = niftiImage[x + y * nx + sliceIndex * nx * ny];
      }
    }

    const imageData = context.createImageData(nx, ny);
    for (let i = 0; i < slice.length; i++) {
      imageData.data[i * 4] = slice[i];
      imageData.data[i * 4 + 1] = slice[i];
      imageData.data[i * 4 + 2] = slice[i];
      imageData.data[i * 4 + 3] = 255;
    }
    context.putImageData(imageData, 0, 0);
  }, [file, sliceIndex]);

  return <canvas ref={canvasRef} width={256} height={256} />;
};

export default ImageViewer;
