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
  const getOS = () => {
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"];
    const windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];
    const iosPlatforms = ["iPhone", "iPad", "iPod"];
    let os = null;
    if (macosPlatforms.indexOf(platform) !== -1) {
      os = "Mac OS";
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = "iOS";
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = "Windows";
    } else if (/Android/.test(userAgent)) {
      os = "Android";
    } else if (!os && /Linux/.test(platform)) {
      os = "Linux";
    }
    return os;
  };
  const os = getOS();

  return (
    <div
      className={
        os === "Windows"
          ? // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            styles.ListOfDorms + " " + styles.Windows
          : styles.ListOfDorms
      }
    >
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
