import { useRouter } from "next/router";
import React from "react";
import styles from "./ListOfDorms.module.css";
import Link from "next/link";

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
    if (typeof window === "undefined") return "Linux";
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
  const sortedDorms = props.dorms.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  return (
    <div
      className={
        os === "Windows"
          ? // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            styles.ListOfDorms + " " + styles.Windows
          : styles.ListOfDorms
      }
    >
      {sortedDorms.map(
        (dorm) =>
          dorm.name.toLowerCase().includes(props.curSearch.toLowerCase()) && (
            <Link
              href={"/dorm/" + dorm.id}
              key={dorm.id}
              className={styles.Dorm}
            >
              {dorm.name}
            </Link>
          )
      )}
      {sortedDorms.every(
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
