import React, { useState } from 'react';

const styles = {
  ruler: {
    position: 'relative',
    height: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    WebkitAppearance: 'none',
    width: '100%',
    height: '20px',
    borderRadius: '10px',
    background: '#ddd',
    outline: 'none',
    marginTop: '10px',
    marginBottom: '5px',
    position: 'relative',
    zIndex: 1,
  },
  sliderThumb: {
    WebkitAppearance: 'none',
    appearance: 'none',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: '#555',
    cursor: 'pointer',
    position: 'relative',
    zIndex: 2,
  },
  markers: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
  markerLong: {
    width: '1px',
    height: '20px',
    background: '#333',
  },
  markerShort: {
    width: '1px',
    height: '10px',
    background: '#999',
  },
  value: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#555',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  markerNumber: {
    position: 'absolute',
    bottom: '-20px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#555',
  },
};

const RulerInput = () => {
  const [value, setValue] = useState(0);

  const inches = Math.floor(value / 4);
  const quarters = value % 4;

  const handleInputChange = (event) => {
    const inputValue = parseInt(event.target.value);
    setValue(inputValue);
  };

  return (
    <div style={styles.ruler}>
      <input type="range" min="0" max="48" value={value} onChange={handleInputChange} style={styles.slider} />
      <div style={styles.markers}>
        {[...Array(49)].map((_, i) => (
          <div key={i} style={i % 4 === 0 ? styles.markerLong : styles.markerShort}>
            {i % 4 === 0 && <div style={styles.markerNumber}>{i / 4}'</div>}
          </div>
        ))}
      </div>
      <div style={styles.value}>{`${inches}' ${quarters}/4"`}</div>
    </div>
  );
};

export default RulerInput;
