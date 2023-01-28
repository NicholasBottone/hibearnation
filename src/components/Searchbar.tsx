import React from "react";
import styles from "./Searchbar.module.css";

export default function Searchbar() {
  return (
    <div className={styles.Searchbar}>
      <input type="text" placeholder="Search..." className={styles.Search} />
    </div>
  );
}
