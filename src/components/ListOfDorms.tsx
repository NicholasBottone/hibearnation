import React from "react";
import styles from "./ListOfDorms.module.css";

interface ListOfDormsProps {
  dorms: string[];
}

export default function ListOfDorms(props: ListOfDormsProps) {
  return (
    <div className={styles.ListOfDorms}>
      {props.dorms.map((dorm) => (
        <div className={styles.Dorm} key={dorm}>
          {dorm}
        </div>
      ))}
    </div>
  );
}
