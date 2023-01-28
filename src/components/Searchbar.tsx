import React from "react";
import styles from "./Searchbar.module.css";

interface SearchbarProps {
  search: string;
  setSearch: (search: string) => void;
}

export default function Searchbar(props: SearchbarProps) {
  return (
    <div className={styles.Searchbar}>
      <img
        src="icon.png"
        alt="Logo"
        className={styles.Logo}
        onClick={() => (window.location.href = "/")}
      />
      <input
        type="text"
        value={props.search}
        placeholder="Search..."
        onChange={(e) => props.setSearch(e.target.value)}
        className={styles.Search}
      />
    </div>
  );
}