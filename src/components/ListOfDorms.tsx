import { useRouter } from "next/router";
import React from "react";
import styles from "./ListOfDorms.module.css";

interface ListOfDormsProps {
  dorms: {
    id: string;
    name: string;
  }[];
  curSearch: string;
}

export default function ListOfDorms(props: ListOfDormsProps) {
  const router = useRouter();

  return (
    <div className={styles.ListOfDorms}>
      {props.dorms.map(
        (dorm) =>
          dorm.name.toLowerCase().includes(props.curSearch.toLowerCase()) && (
            <div
              className={styles.Dorm}
              key={dorm.id}
              onClick={() => {
                void router.push("/dorm/" + dorm.id);
              }}
            >
              {dorm.name}
            </div>
          )
      )}
      {props.dorms.every(
        (dorm) =>
          !dorm.name.toLowerCase().includes(props.curSearch.toLowerCase())
      ) && (
        <div key="No dorms found" style={{ marginTop: "5%", color: "grey" }}>
          No dorms found
        </div>
      )}
    </div>
  );
}
