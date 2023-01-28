import React from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.Navbar}>
      <div className={styles.Name}>
        <p>
          hi<b className={styles.bear}>bear</b>nation
        </p>
      </div>
    </div>
  );
}
