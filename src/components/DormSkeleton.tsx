import React from "react";

import styles from "./Dorm.module.css";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AiFillHome } from "react-icons/ai";
import Link from "next/link";

export default function Dorm() {
  return (
    <SkeletonTheme baseColor="#502424" highlightColor="#eac9c1">
      <div className={styles.buildingContainer}>
        <div className={styles.buildingHeader}>
          <Link href={`/`} className={styles.logo}>
            <AiFillHome className={styles.logo} />
          </Link>

          <h1 className={styles.buildingHeader}>
            <Skeleton width={300} />
          </h1>
        </div>

        <div className={styles.buildingNone}></div>

        <div className={styles.buildingContentContainer}>
          <div className={styles.gridColOne}>
            <div className={styles.itemOne}>
              <div className={styles.summaryHeader}>
                <div className={styles.leftSide}>
                  <h2 className={styles.sectionTitle}>
                    <Skeleton width={100} />
                  </h2>
                </div>
                <div className={styles.addImage}>
                  <Skeleton width={100} />
                </div>
              </div>
              <Skeleton width={300} />
            </div>
            <div className={styles.itemTwo}>
              <div className={styles.sectionDivider} />
              <h2 className={styles.sectionTitle}>
                <Skeleton width={100} />
              </h2>
              <Skeleton width={300} />
            </div>
            <div className={styles.itemThree}>
              <div className={styles.sectionDivider} />
              <h2 className={styles.sectionTitle}>
                <Skeleton width={100} />
              </h2>
              <Skeleton width={300} />
            </div>
          </div>
          <div className={styles.gridColTwo}>
            <div className={styles.sectionDividerMobile} />
            <div className={styles.ReviewHeader}>
              <h2 className={styles.sectionTitle}>
                <Skeleton width={100} />
              </h2>
              <div className={styles.addReview}>
                <Skeleton width={100} />
              </div>
            </div>
            <Skeleton count={5} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}
