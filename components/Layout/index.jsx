import React, { Children } from "react";
import styles from "./StickyNoteGrid.module.css";

const StickyNoteGrid = ({ children }) => {
  return (
    <div className={styles.grid}>
        {children}
    </div>
  );
};

export default StickyNoteGrid;
