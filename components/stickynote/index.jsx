import React from "react";
import styles from "../../src/styles/StickyNote.module.css";

const StickyNote = ({ children }) => {
    const colors = ["#F9DCC4", "#F4B4C1", "#C4E0F9", "#C1F4C4", "#F9C4C4"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className={styles.container} style={{ backgroundColor: randomColor }}>
      <div className={styles.stickyNote}>{children}</div>
    </div>
  );
};

const ItemStickyNote = ({ children }) => {
    const colors = ["#F9DCC4", "#F4B4C1", "#C4E0F9", "#C1F4C4", "#F9C4C4"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
    return (
        
    <div className={styles.container} style={{ backgroundColor: randomColor }}>
        <div className={styles.itemStickyNote}>
            {children}
        </div>
    </div>
    );
};

export { ItemStickyNote };

export default StickyNote;
