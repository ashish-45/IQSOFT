import React from 'react';
import './style.css';

const Slider = ({ max, value, onChange }) => {
  return (
    <input
      type="range"
      min="0"
      max={max}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Slider;
