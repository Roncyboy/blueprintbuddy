import React, { useState } from 'react';
import styles from './ProtractorInput.module.css';

export default function ProtractorInput() {
  const [angle, setAngle] = useState(0);

  const handleAngleChange = (event) => {
    const newAngle = parseFloat(event.target.value);
    setAngle(newAngle);
  };

  return (
    <div className={styles.container}>
      <div className={styles.label}>Enter an angle:</div>
      <div className={styles.circle}>
        <input
          className={styles.slider}
          id="angle-slider"
          type="range"
          min="0"
          max="180"
          step="1"
          value={angle}
          onChange={handleAngleChange}
        />
        <div className={styles.value}>{angle}°</div>
      </div>
    </div>
  );
}
