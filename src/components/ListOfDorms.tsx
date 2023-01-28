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
          dorm.toLowerCase().includes(props.curSearch.toLowerCase()) && (
            <div className={styles.Dorm} key={dorm}>
              {dorm}
            </div>
          )
      )}
      {props.dorms.every(
        (dorm) => !dorm.toLowerCase().includes(props.curSearch.toLowerCase())
      ) && (
        <div key="No dorms found" style={{ marginTop: "5%", color: "grey" }}>
          No dorms found
        </div>
      )}
    </div>
  );
}
