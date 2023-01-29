import React from "react";
import styles from "./DormReview.module.css";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { useState } from "react";
import { User } from "@prisma/client";

interface BuildingReviewProps {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  body: string;
  authorId: string;
  locationId: string;
  upvotes: User[];
  downvotes: User[];
  overallRating: number;
  amenitiesRating: number;
  comfortRating: number;
  locationRating: number;
}

export default function BuildingReview(props: BuildingReviewProps) {
  const upvoteCount = props.upvotes ? props.upvotes.length : 0;
  const downvoteCount = props.downvotes ? props.downvotes.length : 0;
  const [count, setCount] = useState(upvoteCount - downvoteCount);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  return (
    <div className={styles.BuildingReview}>
      <div className={styles.UpvoteDownvoteAndNumber}>
        {count}
        <div className={styles.UpvoteDownvote}>
          <BiUpvote className={styles.Upvote} />
          <BiDownvote className={styles.Downvote} />
        </div>
      </div>
      <div className={styles.reviewSection}>
        <div className={styles.reviewHeader}>
          <div
            style={{
              backgroundColor: "#fce9a2",
              padding: "0.03rem 0.4rem",
              borderRadius: "0.2rem",
              border: "1px solid #f9d56e",
            }}
          >
            {props.overallRating / 2} / 5 <b className={styles.emoji}>⭐</b>
          </div>
          <div
            style={{
              backgroundColor: "#a2f0f9",
              padding: "0.03rem 0.4rem",
              borderRadius: "0.2rem",
              border: "1px solid #6ed5f9",
            }}
          >
            {props.amenitiesRating / 2} / 5 <b className={styles.emoji}>🚿</b>
          </div>
          <div
            style={{
              backgroundColor: "#f9a2a2",
              padding: "0.03rem 0.4rem",
              borderRadius: "0.2rem",
              border: "1px solid #f96e6e",
            }}
          >
            {props.comfortRating / 2} / 5 <b className={styles.emoji}>🛌</b>
          </div>
          <div
            style={{
              backgroundColor: "#a2f0a2",
              padding: "0.03rem 0.4rem",
              borderRadius: "0.2rem",
              border: "1px solid #6ef96e",
            }}
          >
            {props.locationRating / 2} / 5 <b className={styles.emoji}>📍</b>
          </div>
        </div>
        <div className="reviewContent">{props.body}</div>
      </div>
    </div>
  );
}
