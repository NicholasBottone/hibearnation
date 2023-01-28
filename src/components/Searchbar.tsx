import React from "react";
import styles from "./Searchbar.module.css";
import { AiOutlineSearch } from "react-icons/ai";

interface SearchbarProps {
  search: string;
  setSearch: (search: string) => void;
}

export default function Searchbar(props: SearchbarProps) {
  return (
    <div className={styles.Searchbar}>
      <input
        type="text"
        value={props.search}
        placeholder="Search..."
        onChange={(e) => props.setSearch(e.target.value)}
        className={styles.Search}
      />
      {/* onClick focuses input */}
      <AiOutlineSearch
        className={styles.SearchIcon}
        onClick={() => {
          const input = document.querySelector("input");
          if (input) input.focus();
        }}
      />
    </div>
  );
}
