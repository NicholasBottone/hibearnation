import React from "react";
import styles from "./ListOfDorms.module.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ListOfDorms() {
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

  const arr = Array.from({ length: 15 }, (_, i) => i);

  return (
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      <div
        className={
          os === "Windows"
            ? // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
              styles.ListOfDorms + " " + styles.Windows
            : styles.ListOfDorms
        }
      >
        {arr.map((i) => (
          <div className={styles.Dorm} key={i}>
            <Skeleton width={300} />
          </div>
        ))}
      </div>
    </SkeletonTheme>
  );
}
