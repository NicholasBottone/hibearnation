import React from "react";
import styles from "./ListOfDorms.module.css";

interface ListOfDormsProps {
  dorms: string[];
  curSearch: string;
}

export default function ListOfDorms(props: ListOfDormsProps) {
  return (
    <div className={styles.ListOfDorms}>
      {props.dorms.map(
        (dorm) =>
          // only display dorms that contain the search string
          dorm.toLowerCase().includes(props.curSearch.toLowerCase()) && (
            <div className={styles.Dorm} key={dorm}>
              {dorm}
            </div>
          )
      )}
    </div>
  );
}
